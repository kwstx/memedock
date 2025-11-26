# MemeDock Deployment - Step by Step Guide

Follow these steps to deploy your MemeDock application to the web using Vercel (Frontend) + Railway (Backend).

---

## 📋 Pre-Deployment Checklist

Before we start, make sure you have:
- [ ] A GitHub account
- [ ] Git installed on your computer
- [ ] All your code saved and working locally

---

## Step 1: Prepare Your Project for Deployment

### 1.1 Create a .gitignore file in the root

This ensures we don't commit sensitive files or large dependencies.

**Already created for you!** Check that these files exist:
- `backend/.gitignore`
- `frontend/.gitignore` (should already exist from Next.js)

### 1.2 Update API URLs to use environment variables

We need to make sure your frontend can connect to different backend URLs (local vs production).

**Action needed:** Update your frontend files to use the API configuration.

---

## Step 2: Push Your Code to GitHub

### 2.1 Initialize Git (if not already done)

Open PowerShell in your project directory and run:

```powershell
cd C:\Users\galan\.gemini\antigravity\scratch\meme_vault
git init
```

### 2.2 Add all files to Git

```powershell
git add .
```

### 2.3 Commit your code

```powershell
git commit -m "Initial commit - MemeDock ready for deployment"
```

### 2.4 Create a GitHub repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `memedock` (or whatever you prefer)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2.5 Connect your local repo to GitHub

GitHub will show you commands. Copy and run them, or use these:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/memedock.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3: Deploy Backend to Railway

### 3.1 Create Railway Account

1. Go to https://railway.app
2. Click "Login" in the top right
3. Choose "Login with GitHub"
4. Authorize Railway to access your GitHub

### 3.2 Create a New Project

1. Click "New Project" button
2. Select "Deploy from GitHub repo"
3. Choose your `memedock` repository
4. Railway will ask for permissions - click "Install & Authorize"

### 3.3 Configure the Backend Service

1. After selecting your repo, Railway will show "Select a service"
2. Click "Add variables" or skip for now
3. Railway will try to auto-detect - it should detect Python

**IMPORTANT:** Set the root directory to `backend`:
1. Go to Settings (gear icon)
2. Find "Root Directory"
3. Set it to: `backend`
4. Click "Update"

### 3.4 Add Environment Variables (Optional but Recommended)

1. Click on your service
2. Go to "Variables" tab
3. Click "New Variable"
4. Add these (Reddit API is optional):

```
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_secret_here
REDDIT_USER_AGENT=MemeDock/1.0
ENVIRONMENT=production
```

**Note:** If you don't have Reddit API credentials, skip this. The app will still work with Imgflip fallback.

### 3.5 Deploy!

1. Railway should automatically start deploying
2. Wait for the build to complete (5-10 minutes first time)
3. Check the "Deployments" tab to see progress

### 3.6 Get Your Backend URL

1. Go to "Settings" tab
2. Scroll to "Networking"
3. Click "Generate Domain"
4. Copy the URL (e.g., `memedock-backend.up.railway.app`)
5. **SAVE THIS URL** - you'll need it for the frontend!

### 3.7 Test Your Backend

Open your browser and visit:
```
https://your-backend-url.up.railway.app/
```

You should see:
```json
{"message": "Meme Vault Backend is running. Use /get-meme?query=... to search."}
```

Test the search:
```
https://your-backend-url.up.railway.app/get-meme?query=happy
```

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### 4.2 Import Your Project

1. Click "Add New..." → "Project"
2. Find your `memedock` repository
3. Click "Import"

### 4.3 Configure Build Settings

Vercel should auto-detect Next.js. Configure these settings:

**Framework Preset:** Next.js (should be auto-detected)
**Root Directory:** `frontend`
**Build Command:** `npm run build` (auto-filled)
**Output Directory:** `.next` (auto-filled)

### 4.4 Add Environment Variables

**CRITICAL STEP:**

1. Expand "Environment Variables" section
2. Add this variable:

```
Name: NEXT_PUBLIC_API_URL
Value: https://your-railway-backend-url.up.railway.app
```

Replace with your actual Railway backend URL from Step 3.6!

### 4.5 Deploy!

1. Click "Deploy"
2. Wait 2-5 minutes for the build
3. Vercel will show you the deployment progress

### 4.6 Get Your Frontend URL

Once deployed, Vercel will show:
```
https://memedock.vercel.app
```

Or similar. This is your live website!

---

## Step 5: Update Backend CORS Settings

Now that your frontend is live, we need to allow it to communicate with the backend.

### 5.1 Update main.py

Edit `backend/main.py` locally and find this section (around line 12-18):

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Change it to:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://memedock.vercel.app",  # Your Vercel URL
        "http://localhost:3000"  # Keep for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Replace `memedock.vercel.app` with your actual Vercel domain!

### 5.2 Commit and Push

```powershell
git add backend/main.py
git commit -m "Update CORS for production"
git push
```

Railway will automatically redeploy with the new settings!

---

## Step 6: Test Your Live Website! 🎉

### 6.1 Visit Your Website

Go to your Vercel URL: `https://memedock.vercel.app`

### 6.2 Test All Features

- [ ] Homepage loads correctly
- [ ] Search for a meme (try "happy" or "confused")
- [ ] Meme displays in the modal
- [ ] Images load properly
- [ ] Caption feature works
- [ ] Download button works
- [ ] Navigation links work
- [ ] Mobile responsive (test on your phone!)

### 6.3 Check Browser Console

Press F12 → Console tab

Look for any errors. Common issues:
- CORS errors → Check Step 5
- 404 errors → Check backend URL in Vercel env variables
- Image loading issues → Check Railway deployment logs

---

## Step 7: Optional Improvements

### 7.1 Custom Domain (Optional)

**For Vercel:**
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**For Railway:**
1. Go to Settings → Networking
2. Add custom domain
3. Configure DNS

### 7.2 Add Analytics

**Vercel Analytics (Free):**
1. Go to your project → Analytics
2. Enable Vercel Analytics
3. Follow setup instructions

---

## Troubleshooting

### Backend Issues

**Problem:** Railway deployment fails
- Check the logs in Railway dashboard
- Ensure `requirements.txt` is correct
- Ensure `Procfile` exists in backend directory

**Problem:** Backend returns 500 errors
- Check Railway logs
- Ensure all dependencies are installed
- Check if images directory is included

### Frontend Issues

**Problem:** "Failed to fetch" errors
- Check NEXT_PUBLIC_API_URL is set correctly in Vercel
- Check CORS settings in backend
- Ensure backend URL doesn't have trailing slash

**Problem:** Images don't load
- Check if images are committed to Git
- Check Railway deployment includes images folder
- Consider using cloud storage (S3, Cloudinary)

### CORS Issues

**Problem:** CORS errors in browser console
- Update `allow_origins` in `backend/main.py`
- Include your exact Vercel URL
- Redeploy backend after changes

---

## Next Steps After Deployment

1. **Share your project!**
   - Post on Twitter, Reddit, LinkedIn
   - Share with friends and family

2. **Monitor usage**
   - Check Railway usage (free tier: $5 credit/month)
   - Check Vercel analytics

3. **Keep improving**
   - Add more memes to your vault
   - Implement user authentication
   - Add more features

---

## Cost Summary

**Free Tier:**
- Vercel: Free (100GB bandwidth)
- Railway: $5 credit/month (usually enough for hobby projects)
- **Total: $0-5/month**

---

## Support

If you run into issues:
1. Check the troubleshooting section above
2. Check Railway logs (Deployments → View Logs)
3. Check Vercel logs (Deployments → Function Logs)
4. Check browser console (F12)

---

**You're all set! Your MemeDock is now live on the internet! 🚀**

Live URLs:
- Frontend: https://memedock.vercel.app
- Backend: https://memedock-backend.up.railway.app
