# ✅ Cloudflare Pages Deployment Checklist

Your MORPHdrawer.PWA project is now ready for Cloudflare Pages deployment! Follow this checklist to complete the setup.

## Pre-Deployment

- [ ] Verify all dependencies are installed: `pnpm install`
- [ ] Run type check: `pnpm run typecheck`
- [ ] Build locally: `pnpm run deploy:morphdrawer`
- [ ] Verify build output in `artifacts/morphdrawer/dist`
- [ ] Test locally: `pnpm --filter @workspace/morphdrawer run serve`

## Cloudflare Setup

- [ ] Create [Cloudflare Pages](https://pages.cloudflare.com/) account
- [ ] Create new Pages project
- [ ] Connect GitHub repository: `unlacedxo/MORPHdrawer.PWA`
- [ ] Select branch: `main`
- [ ] Set build command: `pnpm run deploy:morphdrawer`
- [ ] Set build output directory: `artifacts/morphdrawer/dist`
- [ ] Save and trigger initial build

## Configuration

- [ ] Update domain in `wrangler.toml` (if deploying to custom domain)
- [ ] Set environment variables in Cloudflare dashboard:
  - `VITE_API_URL` (if using backend API)
  - Any other required vars
- [ ] Configure custom domain (optional)

## Post-Deployment Verification

- [ ] Visit deployed URL in browser
- [ ] Verify page loads correctly
- [ ] Test PWA functionality:
  - [ ] Check manifest.json loads
  - [ ] Service worker registers (DevTools → Application → Service Workers)
  - [ ] Can offline functionality works
- [ ] Verify responsive design on mobile
- [ ] Check performance metrics (Lighthouse)

## GitHub Actions Setup (Optional)

For automatic deployments on every push:

1. [ ] Get Cloudflare API Token:
   - Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Create token with Pages Edit scope
   
2. [ ] Get Cloudflare Account ID:
   - Go to [Account Details](https://dash.cloudflare.com/profile/account)
   - Copy Account ID

3. [ ] Add GitHub Secrets:
   - Go to repo Settings → Secrets and variables → Actions
   - Add `CLOUDFLARE_API_TOKEN`
   - Add `CLOUDFLARE_ACCOUNT_ID`

4. [ ] Create `.github/workflows/deploy-cloudflare-pages.yml` with content from deployment guide

## Monitoring

- [ ] Monitor build logs in Cloudflare Pages dashboard
- [ ] Set up email notifications for failed builds
- [ ] Monitor performance metrics
- [ ] Check error logs regularly

## Performance Optimization

- [ ] Enable Cloudflare Caching
- [ ] Enable Brotli compression
- [ ] Set up image optimization
- [ ] Monitor Core Web Vitals

## Security

- [ ] Enable HTTPS (automatic with Cloudflare)
- [ ] Set security headers in `cloudflare-pages.yml`
- [ ] Enable DDoS protection
- [ ] Review rate limiting settings

## Files Created/Modified

### New Files:
- `wrangler.toml` - Wrangler configuration
- `cloudflare-pages.yml` - Cloudflare Pages config with headers & caching
- `CLOUDFLARE_PAGES_SETUP.md` - Setup guide
- `DEPLOYMENT_CHECKLIST.md` - This file

### Modified Files:
- `artifacts/morphdrawer/vite.config.ts` - Production optimizations
  - Added Tailwind CSS plugin
  - Added code splitting (vendor chunks)
  - Added minification with terser
  - Removed source maps for production

## Troubleshooting

### Build Fails
```bash
# Verify build locally
pnpm run deploy:morphdrawer

# Check for TypeScript errors
pnpm run typecheck

# Check dependencies
pnpm ls
```

### Deploy Not Updating
- Clear Cloudflare cache
- Check if branch is set correctly to `main`
- Verify webhook is connected

### PWA Not Working
- Check manifest.json is in `dist/` folder
- Verify service worker path in code
- Check browser console for errors
- Ensure HTTPS is enabled

### Performance Issues
- Check bundle size: `pnpm run deploy:morphdrawer --report`
- Review code splitting in vite.config.ts
- Optimize images in source
- Enable Brotli in Cloudflare

## Next Steps

1. **Domain Setup**: Add custom domain in Cloudflare Pages settings
2. **Analytics**: Enable Cloudflare Web Analytics
3. **API Integration**: Configure backend API endpoints
4. **Monitoring**: Set up uptime monitoring
5. **CI/CD**: Configure GitHub Actions for automated deployments

## Useful Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Documentation](https://vitejs.dev/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Web Vitals](https://web.dev/vitals/)

---

**Last Updated:** 2026-05-18  
**Status:** ✅ Ready for Deployment
