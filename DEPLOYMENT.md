# 🚀 Deployment Guide - Battlefield Strategy AI

## Quick Deploy Options

### ✅ **Option 1: Vercel (Recommended - 2 minutes)**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd battlefield-ai
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? battlefield-ai
# - Directory? ./
# - Override settings? No

# Done! You get a live URL instantly.
```

**Vercel auto-detects:**
- Vite build command
- Output directory (dist)
- No configuration needed!

---

### ✅ **Option 2: Netlify (3 minutes)**

**Via Drag & Drop:**
```bash
# 1. Build the project
npm run build

# 2. Go to https://app.netlify.com/drop

# 3. Drag the 'dist' folder to the page

# Done! Instant deployment.
```

**Via CLI:**
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Deploy
npm run build
netlify deploy --prod

# Follow prompts, select 'dist' as publish directory
```

---

### ✅ **Option 3: GitHub Pages (5 minutes)**

```bash
# 1. Add to package.json:
{
  "homepage": "https://YOUR_USERNAME.github.io/battlefield-ai",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Deploy
npm run deploy

# 4. Enable GitHub Pages in repo settings
# Source: gh-pages branch
```

---

### ✅ **Option 4: Firebase Hosting**

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# Select:
# - Public directory: dist
# - Configure as SPA: Yes
# - Automatic builds: No

# 4. Deploy
npm run build
firebase deploy
```

---

## 📦 Build Configuration

**Build command:**
```bash
npm run build
```

**Output directory:**
```
dist/
```

**Requirements:**
- Node.js 18+
- No environment variables needed
- No backend required
- Static files only

---

## 🔧 Custom Domain Setup

### Vercel:
```bash
vercel --prod
vercel domains add yourdomain.com
```

### Netlify:
1. Build Settings → Domain Management
2. Add custom domain
3. Configure DNS (CNAME or A record)

---

## ⚡ Performance Optimization

**Already included:**
- ✅ Code splitting
- ✅ Asset minification
- ✅ Gzip compression
- ✅ CSS purging via Tailwind
- ✅ Tree shaking

**Build output:**
- HTML: ~0.5 KB
- CSS: ~17 KB (gzipped: ~4 KB)
- JS: ~236 KB (gzipped: ~71 KB)

**Lighthouse Score Target:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## 🌍 Environment Variables

**None required!** This is a pure frontend app.

If you want to add analytics:
```bash
# .env (optional)
VITE_GA_ID=your-google-analytics-id
```

Access in code:
```typescript
const gaId = import.meta.env.VITE_GA_ID;
```

---

## 📊 Monitoring

### Add Google Analytics:

1. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Add Error Tracking (Sentry):

```bash
npm install @sentry/react
```

In `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

---

## 🔒 Security Headers

### Netlify (_headers file):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Vercel (vercel.json):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 🐛 Troubleshooting Deployment

**Build fails on deploy:**
```bash
# Ensure Node.js version matches
# Add .nvmrc file:
echo "18" > .nvmrc

# Or specify in package.json:
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**404 on page refresh:**
```bash
# Add _redirects for Netlify:
/*    /index.html   200

# Or vercel.json:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Assets not loading:**
```bash
# Check vite.config.ts base URL:
export default defineConfig({
  base: '/',  // or '/battlefield-ai/' for GitHub Pages
})
```

---

## 📈 Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Verify all routes work
- [ ] Check console for errors
- [ ] Test different browsers
- [ ] Verify analytics tracking
- [ ] Check page load speed
- [ ] Test AI functionality
- [ ] Verify custom domain (if added)

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- Zero configuration
- Auto HTTPS
- Global CDN
- Preview deployments
- Analytics included
- Free tier generous

**Deployment time:** < 2 minutes  
**Cost:** Free for personal projects

---

**Questions?** Check the main README.md or create an issue!
