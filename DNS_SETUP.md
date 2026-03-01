# DNS Configuration for Custom Domain

This guide helps you point your registered domain to your GitHub Pages site.

## Prerequisites
- Your domain is registered
- Access to your domain registrar's DNS settings
- GitHub repository deployed on GitHub Pages

## Step-by-Step DNS Setup

### Step 1: Get Your GitHub Pages URL
1. Go to your GitHub repository
2. Click **Settings → Pages**
3. Note the URL (should be `https://<username>.github.io/devpuri-farms-analysis`)
4. Copy your GitHub username

### Step 2: Configure A Records (Primary Method)

Go to your domain registrar's DNS settings and add these 4 A records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**What this does:**
- Points your root domain (e.g., `yourdomain.com`) to GitHub Pages servers
- The `@` symbol represents your root domain
- Multiple A records provide redundancy

### Step 3: Configure CNAME for WWW (Optional)

If you want `www.yourdomain.com` to work:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `<username>.github.io` | 3600 |

**Example:**
```
Name: www
Value: johndoe.github.io
```

### Step 4: Configure GitHub Pages Custom Domain

1. Go to your GitHub repository
2. Click **Settings → Pages**
3. Scroll to **Custom domain**
4. Enter your domain name (e.g., `yourdomain.com`)
5. Click **Save**
6. GitHub will:
   - Verify the domain connection
   - Create a `CNAME` file in your repo
   - Enable HTTPS (automatic after 24 hours)

### Step 5: Verify Setup

After waiting for DNS propagation (15 minutes to 48 hours):

**Test in terminal:**
```bash
# Check A records
nslookup yourdomain.com

# Check CNAME
nslookup www.yourdomain.com
```

**Expected output:**
```
Server:  8.8.8.8
Address: 8.8.8.8

Name:    yourdomain.com
Addresses:  185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153
```

---

## Common Registrars - How to Access DNS Settings

### GoDaddy
1. Log in to GoDaddy
2. Go to **Products → Domains**
3. Select your domain
4. Click **Manage → DNS**
5. Add records under "A", "CNAME", etc.

### Namecheap
1. Log in to Namecheap
2. Click **Manage** next to your domain
3. Click **Advanced DNS** tab
4. Add records under "Host Records"

### Google Domains
1. Log in to Google Domains
2. Click your domain
3. Click **DNS** in left menu
4. Scroll to "Custom records"
5. Add A and CNAME records

### Bluehost
1. Log in to Bluehost
2. Go to **Domains → Manage Domain**
3. Click **Manage DNS**
4. Add A and CNAME records

### Cloudflare
1. Add your domain to Cloudflare
2. Go to **DNS** tab
3. Click **Add record**
4. Configure A and CNAME as needed
5. Update nameservers at your registrar

---

## Troubleshooting DNS Issues

### Domain Points to Old IP
- **Problem**: Site not loading or showing old content
- **Solution**: Wait 24-48 hours for DNS to propagate globally
- **Check**: Use `nslookup` to verify DNS records

### HTTPS Not Working
- **Problem**: Site loads but shows SSL warning
- **Solution**: GitHub needs time to provision certificate
- Uncheck "Enforce HTTPS" in Settings → Pages, then re-check it after 1 hour

### Redirect Loop
- **Problem**: Infinite redirect between www and non-www
- **Solution**: Make sure you have EITHER:
  - A records for root domain (`@`), OR
  - CNAME for www subdomain
  - Not both pointing to different places

### 404 on Custom Domain
- **Problem**: Domain loads GitHub 404 page
- **Solution**:
  1. Verify `CNAME` file exists in your repo root
  2. Check custom domain is set in GitHub Settings → Pages
  3. Wait for HTTPS provisioning (shows a green checkmark)

---

## DNS Propagation Check

Use an online tool to verify propagation:
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

Enter your domain and these tools show DNS status globally.

---

## After DNS Setup

### Initial Load
- First time may take a few minutes to load
- Clear browser cache if needed
- Try incognito/private window

### Deployment
- Every push to `main` branch auto-deploys
- GitHub Actions handles build and deployment
- Check Actions tab for deployment status

### Monitoring
- GitHub Pages automatically provides HTTPS
- Your site is live and secured!
- Monitor performance in GitHub → Settings → Pages

---

## Useful Commands

```bash
# Test DNS resolution
nslookup yourdomain.com
nslookup www.yourdomain.com

# More detailed DNS info
dig yourdomain.com

# Check CNAME records
dig yourdomain.com CNAME
dig www.yourdomain.com CNAME
```

---

**Your domain should be live within 48 hours!** 🎉
