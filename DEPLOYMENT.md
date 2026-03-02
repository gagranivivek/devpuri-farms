# GitHub Pages Deployment Guide

This document provides complete instructions for deploying and managing your Next.js application on GitHub Pages with your custom domain.

## Overview

Your application is set up with:
- **Automatic deployment** via GitHub Actions (every push to `main` branch)
- **Static export** configuration for GitHub Pages
- **Custom domain support** for your registered domain

---

## Initial Setup Steps

### 1. Verify Repository Settings
Go to your GitHub repository and:
1. Navigate to **Settings → Pages**
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This should already be configured if you pushed the `.github/workflows/deploy.yml` file

### 2. First Deployment

Push your current changes to GitHub:

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Initial setup for GitHub Pages deployment with custom domain"

# Push to main branch
git push origin main
```

Watch the deployment:
1. Go to your repository
2. Click the **Actions** tab
3. You should see the "Build and Deploy to GitHub Pages" workflow running
4. Wait for it to complete (usually takes 2-3 minutes)

### 3. View Your Deployed Site

After the workflow completes successfully:
- Your site will be available at: `https://<github-username>.github.io/devpuri-farms-analysis`
- Go to **Settings → Pages** to see the deployment URL

---

## Configuring Your Custom Domain

### Option A: Direct Custom Domain (Recommended)

If your domain registrar supports DNS records:

1. **Get GitHub Pages IP Addresses**
   GitHub Pages uses these IP addresses:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **Add A Records to Your Domain**
   - Go to your domain registrar's DNS settings
   - Add A records pointing to the GitHub IPs above
   - Example (in most registrars):
     ```
     Type: A
     Name: @ (or leave blank)
     Value: 185.199.108.153
     TTL: 3600
     ```
   - Repeat for all 4 IP addresses with different priority/weight values

3. **Add CNAME Record (Optional)**
   - If your registrar allows, you can also use:
     ```
     Type: CNAME
     Name: www
     Value: <github-username>.github.io.
     ```

4. **Configure in GitHub**
   - Go to **Repository Settings → Pages**
   - Under "Custom domain", enter your domain name
   - Click **Save**
   - GitHub will automatically create a `CNAME` file in your repo

5. **Wait for DNS Propagation**
   - DNS changes can take 24-48 hours to fully propagate
   - Check status with: `nslookup yourdomain.com`

---

## Future Deployments

### Making Changes
Every time you make changes to your code:

```bash
# Make your changes in VS Code

# Stage your changes
git add .

# Commit
git commit -m "Description of your changes"

# Push to main
git push origin main
```

GitHub Actions will automatically:
1. Detect the push to `main`
2. Install dependencies
3. Build the Next.js app
4. Export to static files
5. Deploy to GitHub Pages

**No manual deployment needed!**

### Monitor Deployments
- Check the **Actions** tab to see deployment status
- Each push creates a new workflow run
- Failed deployments will show errors in the workflow logs

---

## Workflow Details

### Automatic Deployment Trigger
The workflow in `.github/workflows/deploy.yml` automatically runs when:
- You push to the `main` branch
- Pull requests are created or updated to `main`

### What the Workflow Does
1. Checks out your code
2. Sets up Node.js v20
3. Installs npm dependencies
4. Builds the Next.js app and exports to static files (`npm run build`)
5. Uploads the `out/` folder to GitHub Pages
6. Deploys to your GitHub Pages site

### Build Environment
- **OS**: Ubuntu latest
- **Node.js**: v20
- **NPM**: Latest (cached for speed)

---

## Development vs Production

### Local Development
```bash
# Run development server locally
npm run dev
```
- Full Next.js features available
- Hot reload on changes
- Accessible at `http://localhost:3000`

### Production Build (What Deploys)
```bash
# Build (automatically exports to out/ folder)
npm run build
```
- Static files generated in `out/` folder
- No Node.js runtime needed
- What actually gets deployed to GitHub Pages

---

## Troubleshooting

### Deployment Failed
1. Check the **Actions** tab for error messages
2. Common issues:
   - Missing dependencies → Run `npm install` and push
   - Build errors → Check npm output for specific errors
   - Export issues → Verify no dynamic features in config

### Custom Domain Not Working
1. Verify DNS records are correctly configured
2. Wait for DNS propagation (24-48 hours)
3. Check **Settings → Pages** shows your domain
4. Clear browser cache or try incognito mode

### Site Looks Broken
1. Check if images/assets are loading (check browser console)
2. May be a basePath issue (see Configuration section)
3. Verify correct files in `out/` folder

---

## Configuration Notes

### BasePath Configuration
Currently configured for custom domain (root of domain).

If you need to use repo subdomain `yourdomain.com/devpuri-farms-analysis`:
Edit `next.config.mjs`:
```javascript
basePath: '/devpuri-farms-analysis',
assetPrefix: '/devpuri-farms-analysis/',
```

---

## Quick Reference

```bash
# Clone repository
git clone <your-repo-url>

# Install dependencies
npm install

# Development server
npm run dev

# Build and export to static files (out/ folder)
npm run build

# Deploy changes
git add .
git commit -m "Changes"
git push origin main
```

---

## Support Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export Guide](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Your deployment is now automated! Just code and push.** 🚀
