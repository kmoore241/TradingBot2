# Superalgos Deployment Guide

This guide explains how to deploy Superalgos to Vercel and Netlify platforms.

## 🚀 Quick Deployment

### Vercel Deployment

1. **Connect to Vercel:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables:**
   - Copy `.env.example` to `.env` and configure your variables
   - Add environment variables in Vercel dashboard

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Netlify Deployment

1. **Connect to Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## 📁 Project Structure

The deployment configuration handles multiple components:

- **Main Platform**: Node.js backend (`platform.js`)
- **Dashboards**: Vue.js frontend built with Webpack
- **Social Trading**: Vite-based Vue.js application
- **Static Assets**: HTML files, images, and other resources

## ⚙️ Configuration Files

### Vercel (`vercel.json`)
- Handles serverless functions
- Routes API calls to platform.js
- Serves static assets
- Builds dashboard and social trading apps

### Netlify (`netlify.toml`)
- Netlify Functions for backend
- Redirects and headers configuration
- Build commands and environment setup

## 🔧 Build Process

### Build Commands

```bash
# For Netlify
npm run build:netlify

# For Vercel
npm run build:vercel

# Individual components
npm run build:dashboards
npm run build:social-trading
```

### Build Output
- `Dashboards/UI/vueComponentsBuilt/` - Dashboard frontend
- `Social-Trading/Vue-UI/dist/` - Social trading frontend
- `dist/` - Combined static assets (Netlify)

## 🌐 Routing

### API Routes
- `/api/*` → Backend functions
- `/dashboards/*` → Dashboard frontend
- `/social-trading/*` → Social trading frontend

### Static Routes
- `/` → Main landing page
- `/selection.html` → Workspace selection
- `/console.html` → Console interface

## 🔒 Security

### Headers
- CSP, XSS protection, frame options
- CORS configuration for API endpoints
- Asset caching strategies

### Environment Variables
Required variables (see `.env.example`):
- `NODE_ENV=production`
- `PLATFORM_MODE=production`
- API keys for exchanges
- Database configuration (if external)

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures:**
   - Ensure Node.js 18+ is used
   - Check package dependencies
   - Verify build scripts

2. **API Connectivity:**
   - Check function deployment
   - Verify environment variables
   - Review CORS settings

3. **Asset Loading:**
   - Confirm public path configuration
   - Check redirect rules
   - Verify asset copying

### Debug Commands

```bash
# Test local build
npm run build:netlify
npm run serve

# Check dependencies
npm audit
npm ls

# Validate configuration
netlify functions:list
vercel env ls
```

## 📈 Performance

### Optimizations
- Asset caching (1 year)
- Gzip compression
- Code splitting
- Image optimization

### Monitoring
- Function logs in platform dashboards
- Performance metrics
- Error tracking

## 🔄 CI/CD

### GitHub Actions (Recommended)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:netlify
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📋 Checklist

Before deploying:

- [ ] Environment variables configured
- [ ] Build scripts tested locally
- [ ] API endpoints verified
- [ ] Security headers reviewed
- [ ] Performance optimizations applied
- [ ] Monitoring setup complete

## 🆘 Support

For deployment issues:
1. Check the deployment logs
2. Review configuration files
3. Test builds locally
4. Consult platform documentation
5. Contact the Superalgos community

## 🔗 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Superalgos Community](https://t.me/superalgoscommunity)
- [GitHub Repository](https://github.com/Superalgos/Superalgos)