# Deployment Checklist

Use this checklist to ensure smooth deployment of MemeHub.

## Pre-Deployment

- [ ] All code is committed to Git
- [ ] GitHub repository is created and pushed
- [ ] Environment variables are documented in `.env.example` files
- [ ] `requirements.txt` is up to date
- [ ] All hardcoded `localhost` URLs are replaced with environment variables
- [ ] CORS settings are configured for production domains
- [ ] Images are either committed to Git or uploaded to cloud storage

## Backend Deployment (Railway)

- [ ] Railway account created
- [ ] New project created from GitHub repo
- [ ] `backend` directory selected as root
- [ ] Environment variables added:
  - [ ] `REDDIT_CLIENT_ID` (optional)
  - [ ] `REDDIT_CLIENT_SECRET` (optional)
  - [ ] `ENVIRONMENT=production`
- [ ] Domain generated and copied
- [ ] Deployment successful (check logs)
- [ ] API endpoint tested: `https://your-backend.railway.app/`
- [ ] Search endpoint tested: `https://your-backend.railway.app/get-meme?query=test`

## Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] New project created from GitHub repo
- [ ] `frontend` directory selected as root
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_API_URL=https://your-backend.railway.app`
- [ ] Build successful
- [ ] Domain generated and copied
- [ ] Website loads correctly
- [ ] All pages accessible (home, search, vault, submit, vote)

## Post-Deployment

- [ ] Update backend CORS with frontend domain
- [ ] Test search functionality
- [ ] Test image loading
- [ ] Test meme submission
- [ ] Test voting system
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Set up error monitoring (optional)

## Testing Checklist

### Search Functionality
- [ ] Search returns results
- [ ] External fallback works (Reddit/Imgflip)
- [ ] Explanation text displays correctly
- [ ] Images load properly

### Meme Display
- [ ] Modal opens on search result
- [ ] Image displays correctly
- [ ] Caption input works
- [ ] Text background toggle works
- [ ] Text size slider works
- [ ] Text dragging works
- [ ] Download button works
- [ ] "Try Another" button works

### Other Features
- [ ] Navbar links work
- [ ] Mobile menu works
- [ ] Vault page displays all memes
- [ ] Submit page accepts uploads
- [ ] Vote page allows voting
- [ ] Footer displays correctly

## Troubleshooting

If something doesn't work:

1. **Check Railway logs**: Dashboard → Deployments → View Logs
2. **Check Vercel logs**: Dashboard → Deployments → Function Logs
3. **Check browser console**: F12 → Console tab
4. **Verify environment variables**: Both platforms, Settings → Environment Variables
5. **Test API directly**: Visit `https://your-backend.railway.app/` in browser
6. **Check CORS**: Ensure frontend domain is in backend's `allow_origins`

## Performance Optimization (Optional)

- [ ] Enable Vercel Analytics
- [ ] Compress images (use TinyPNG or similar)
- [ ] Add caching headers
- [ ] Enable CDN for images
- [ ] Optimize AI model loading
- [ ] Add loading states for better UX

## Security (Optional but Recommended)

- [ ] Add rate limiting to API
- [ ] Validate file uploads
- [ ] Sanitize user inputs
- [ ] Add HTTPS redirect
- [ ] Set up CSP headers
- [ ] Enable security headers

---

**Deployment Complete!** 🎉

Share your live URL:
- Frontend: https://your-site.vercel.app
- Backend API: https://your-backend.railway.app

Next steps:
1. Share with friends
2. Post on social media
3. Submit to Product Hunt
4. Keep improving!
