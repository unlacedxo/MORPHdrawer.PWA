# Cloudflare Pages Deployment Guide

## Setup Instructions

### 1. Connect Your Repository to Cloudflare Pages
- Go to [Cloudflare Pages](https://pages.cloudflare.com/)
- Click "Create a project" → "Connect to Git"
- Select your GitHub repository (`unlacedxo/MORPHdrawer.PWA`)
- Select branch: `main`

### 2. Configure Build Settings
When prompted, use these settings:

**Framework preset:** None (custom)

**Build command:**
```bash
pnpm run deploy:morphdrawer
```

**Build output directory:**
```
artifacts/morphdrawer/dist
```

### 3. Environment Variables (if needed)
In the Cloudflare Pages dashboard, add any required environment variables:

```
VITE_API_URL=https://your-api-endpoint.com
```

### 4. Custom Domain (Optional)
1. In Cloudflare Pages project settings, go to "Custom domains"
2. Add your custom domain
3. Follow the DNS setup instructions

## Deployment Details

### Build Process
- The build command runs `pnpm run deploy:morphdrawer`
- This executes `pnpm --filter @workspace/morphdrawer run build`
- Output is generated in `artifacts/morphdrawer/dist`

### PWA Support
- Service worker configuration in `vite.config.ts`
- Manifest file should be served at `/manifest.json`
- Cache headers configured for optimal PWA experience

### Performance Optimizations
- Code splitting with manual chunks (React vendors, UI vendors, form libraries)
- Terser minification with console.log removal
- No source maps in production
- Asset optimization

### File Caching Strategy
- JavaScript and CSS: 1 year immutable cache
- Fonts (WOFF2): 1 year immutable cache
- Service worker: 0 cache (always fresh)
- Manifest: No cache (always fresh)

## Post-Deployment

### Monitor Builds
1. Go to your Cloudflare Pages project
2. Check "Deployments" tab for build status
3. View real-time logs if build fails

### Troubleshooting

**Build Fails:**
- Check build command syntax
- Verify pnpm dependencies are installed
- Check Node.js version compatibility

**Site Not Loading:**
- Verify build output directory path
- Check Cloudflare Pages custom domain settings
- Clear browser cache

**PWA Issues:**
- Verify manifest.json is accessible
- Check service worker registration in browser console
- Ensure HTTPS is enabled (required for PWA)

## Next Steps

1. **Update environment variables** - Replace `example.com` with your actual domain
2. **Configure API endpoints** - Set `VITE_API_URL` if using backend services
3. **Add custom domain** - In Cloudflare Pages dashboard settings
4. **Enable analytics** - Optional: Enable Cloudflare Web Analytics
5. **Configure redirects** - Add any custom redirects in `cloudflare-pages.yml`

## Useful Links

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [PWA Standards](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
