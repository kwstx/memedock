# MemeDock Deployment Guide

This guide covers deploying your MemeHub application to the web. We'll cover the recommended approach using modern hosting platforms.

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED](#option-1-vercel--railway-recommended)
4. [Option 2: Full Stack on Railway](#option-2-full-stack-on-railway)
5. [Option 3: AWS/DigitalOcean (Advanced)](#option-3-awsdigitalocean-advanced)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Troubleshooting](#troubleshooting)

---

## Overview

**Your Stack:**
- **Frontend**: Next.js 16 (React)
- **Backend**: FastAPI (Python)
- **AI Model**: SentenceTransformer (requires Python runtime)
- **Static Assets**: Images in `/images` directory
- **Data**: JSON files for metadata and embeddings

**Deployment Strategy:**
- Frontend → Static hosting with serverless functions
- Backend → Python-compatible hosting with persistent storage
- Images → CDN or static file hosting

---

## Prerequisites

Before deploying, you need:

### 1. **GitHub Account**
Create a repository for your project:
```bash
cd c:\Users\galan\.gemini\antigravity\scratch\meme_vault
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/memehub.git
git push -u origin main
```

### 2. **Environment Variables to Prepare**

**Backend (.env):**
```env
# Optional Reddit API (for fallback)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=MemeVault/1.0

# Production settings
ENVIRONMENT=production
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

### 3. **Update CORS Settings**

Edit `backend/main.py` to restrict CORS in production:
```python
# Replace line 14 with:
allow_origins=[
    "https://your-frontend-domain.vercel.app",
    "http://localhost:3000"  # Keep for local dev
]
```

---

## Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

This is the **easiest and most cost-effective** option for your project.

### **Why This Combo?**
- ✅ Vercel: Best for Next.js, free tier, global CDN
- ✅ Railway: Supports Python, easy deployment, $5/month free credit
- ✅ Both have excellent free tiers for hobby projects

---

### **Step 1: Deploy Backend to Railway**

#### 1.1 Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

#### 1.2 Prepare Backend for Deployment

Create `backend/requirements.txt`:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sentence-transformers==2.2.2
numpy==1.24.3
praw==7.7.1
requests==2.31.0
python-multipart==0.0.6
```

Create `backend/Procfile`:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

Create `backend/railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 1.3 Deploy to Railway

1. **Push changes to GitHub**:
```bash
git add .
git commit -m "Add Railway deployment files"
git push
```

2. **In Railway Dashboard**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder as root directory
   - Railway will auto-detect Python and deploy

3. **Configure Environment Variables**:
   - Go to your project → Variables
   - Add `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` (optional)
   - Add `ENVIRONMENT=production`

4. **Generate Domain**:
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy the URL (e.g., `memehub-backend.up.railway.app`)

#### 1.4 Upload Static Assets

**Important:** Railway doesn't persist files between deployments. You have two options:

**Option A: Include images in Git (Simple)**
```bash
# Add images to git
git add images/
git commit -m "Add meme images"
git push
```

**Option B: Use Cloud Storage (Recommended for production)**
- Upload images to AWS S3, Cloudinary, or ImgBB
- Update `search_engine.py` to use cloud URLs
- Keep local images for development

---

### **Step 2: Deploy Frontend to Vercel**

#### 2.1 Prepare Frontend

Create `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://memehub-backend.up.railway.app
```

Update `frontend/next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'memehub-backend.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: '**.reddit.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgflip.com',
      },
    ],
  },
};

export default nextConfig;
```

Update API calls to use environment variable. In all frontend files, replace:
```typescript
// OLD:
fetch(`http://127.0.0.1:8000/get-meme?query=...`)

// NEW:
fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-meme?query=...`)
```

#### 2.2 Deploy to Vercel

1. **Push changes**:
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

2. **In Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - **Root Directory**: Select `frontend`
   - **Framework Preset**: Next.js (auto-detected)
   - Click "Deploy"

3. **Configure Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` = `https://memehub-backend.up.railway.app`
   - Redeploy

4. **Get Your URL**:
   - Vercel will give you a URL like `memehub.vercel.app`
   - You can add a custom domain later

#### 2.3 Update Backend CORS

Update `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://memehub.vercel.app",  # Your Vercel domain
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Push and Railway will auto-redeploy:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

---

## Option 2: Full Stack on Railway

Deploy both frontend and backend on Railway.

### **Step 1: Deploy Backend** (Same as Option 1)

### **Step 2: Deploy Frontend**

1. **Create separate Railway service**:
   - New Project → Deploy from GitHub
   - Select `frontend` directory
   - Railway auto-detects Next.js

2. **Configure Build**:
   - Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.railway.app`
   - Railway will run `npm run build` automatically

3. **Generate Domain** for frontend

**Pros:** Everything in one platform
**Cons:** Railway charges for both services (but still within free tier initially)

---

## Option 3: AWS/DigitalOcean (Advanced)

For full control and scalability.

### **Architecture:**
- **Frontend**: AWS S3 + CloudFront or Netlify
- **Backend**: EC2 instance or DigitalOcean Droplet
- **Database**: Optional PostgreSQL for metadata
- **Storage**: S3 for images

### **Steps (High-Level):**

1. **Set up EC2/Droplet**:
   - Ubuntu 22.04 LTS
   - Install Python 3.10+, Nginx, Supervisor
   - Clone repository
   - Install dependencies
   - Configure Nginx as reverse proxy
   - Use Supervisor to keep app running

2. **Deploy Frontend**:
   - Build: `npm run build`
   - Upload to S3
   - Configure CloudFront CDN
   - Set up custom domain

3. **Configure SSL**:
   - Use Let's Encrypt (Certbot) for backend
   - AWS Certificate Manager for frontend

**Cost:** ~$10-20/month minimum

---

## Post-Deployment Configuration

### **1. Custom Domain (Optional)**

**For Vercel:**
- Go to Project Settings → Domains
- Add your domain (e.g., `memehub.com`)
- Update DNS records as instructed

**For Railway:**
- Settings → Networking → Custom Domain
- Add domain and configure DNS

### **2. Environment Variables Checklist**

**Backend:**
- ✅ `REDDIT_CLIENT_ID` (optional)
- ✅ `REDDIT_CLIENT_SECRET` (optional)
- ✅ `ENVIRONMENT=production`

**Frontend:**
- ✅ `NEXT_PUBLIC_API_URL`

### **3. Update Hardcoded URLs**

Search for `127.0.0.1:8000` in your codebase and replace with environment variable:

```bash
# In frontend directory
grep -r "127.0.0.1:8000" src/
```

Replace all instances with:
```typescript
process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
```

### **4. Monitoring & Analytics**

**Vercel:**
- Built-in analytics available
- Error tracking in dashboard

**Railway:**
- View logs in real-time
- Set up health checks

**Optional Tools:**
- Sentry for error tracking
- Google Analytics for user tracking
- Uptime monitoring (UptimeRobot)

---

## Troubleshooting

### **Issue: CORS Errors**

**Solution:**
```python
# backend/main.py
allow_origins=[
    "https://your-exact-frontend-url.vercel.app",
    "http://localhost:3000"
]
```

### **Issue: Images Not Loading**

**Check:**
1. Images are committed to Git
2. `/images` directory is in backend root
3. Railway has deployed the images
4. CORS allows image requests

**Solution:** Use cloud storage (S3, Cloudinary)

### **Issue: AI Model Takes Too Long to Load**

**Railway:**
- Increase memory allocation in settings
- Model loads on first request (expect 10-30s delay)
- Consider caching embeddings

### **Issue: Build Fails on Vercel**

**Check:**
1. `package.json` has all dependencies
2. No TypeScript errors: `npm run build` locally
3. Environment variables are set
4. Node version compatibility

### **Issue: Backend Crashes**

**Check Railway Logs:**
```bash
# In Railway dashboard → Deployments → View Logs
```

Common causes:
- Missing dependencies in `requirements.txt`
- File path issues (use relative paths)
- Memory limits exceeded

---

## Cost Breakdown

### **Recommended Setup (Vercel + Railway):**

**Free Tier:**
- Vercel: Free (100GB bandwidth, unlimited deployments)
- Railway: $5 credit/month (usually enough for hobby projects)
- **Total: $0-5/month**

**Paid (if you exceed free tier):**
- Vercel Pro: $20/month (more bandwidth, team features)
- Railway: ~$5-10/month (based on usage)
- **Total: ~$25-30/month**

### **AWS Setup:**
- EC2 t2.micro: $8/month
- S3 + CloudFront: $5-10/month
- Domain: $12/year
- **Total: ~$15-20/month**

---

## Next Steps After Deployment

1. **Test Everything:**
   - Search functionality
   - Image loading
   - Voting system
   - Meme submission

2. **Set Up Analytics:**
   - Google Analytics
   - Vercel Analytics
   - Track user behavior

3. **Optimize Performance:**
   - Enable caching
   - Compress images
   - Use CDN for static assets

4. **Add Features:**
   - User authentication
   - Personal meme collections
   - Share functionality

5. **Marketing:**
   - Share on Reddit, Twitter
   - Product Hunt launch
   - SEO optimization

---

## Quick Start Commands

```bash
# 1. Prepare for deployment
cd c:\Users\galan\.gemini\antigravity\scratch\meme_vault
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/memehub.git
git push -u origin main

# 3. Deploy backend to Railway
# (Use Railway dashboard - no CLI needed)

# 4. Deploy frontend to Vercel
# (Use Vercel dashboard - no CLI needed)

# 5. Update environment variables in both platforms

# 6. Test your live site!
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**You're ready to deploy! Start with Option 1 (Vercel + Railway) - it's the easiest and most reliable for your stack.** 🚀
