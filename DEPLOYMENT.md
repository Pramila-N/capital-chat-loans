# Deployment Guide - Tata Capital Loans Chat

## 404 Error Fix

The 404 error occurs because the SPA (Single Page Application) needs to fallback all routes to `index.html`. This has been configured for multiple platforms:

### ✅ Configured Platforms:

#### 1. **Vercel** (Recommended for Next.js/Vite)
- File: `vercel.json` (already created)
- Automatic deployment from GitHub
- Steps:
  1. Push code to GitHub
  2. Go to [vercel.com](https://vercel.com)
  3. Import your repository
  4. Framework: Select "Vite"
  5. Deploy

#### 2. **Netlify**
- File: `netlify.toml` (already created)
- Steps:
  1. Go to [netlify.com](https://netlify.com)
  2. Connect GitHub repo
  3. Build command: `npm run build`
  4. Publish directory: `dist`
  5. Deploy

#### 3. **Traditional Apache Server**
- File: `public/.htaccess` (already created)
- All non-file/non-folder requests redirect to `index.html`

#### 4. **Nginx Server**
Add this to your `server` block in `nginx.conf`:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### 5. **Other Servers (Express, etc.)**
```javascript
app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
```

## Build & Deploy Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm preview

# The `dist/` folder is ready to deploy
```

## Environment Variables

If you need environment variables, create a `.env` file:
```
VITE_API_URL=your_api_url_here
```

## Build Output

- **Output Directory**: `dist/`
- **Entry Point**: `dist/index.html`
- **Assets**: Automatically optimized and hashed

## Troubleshooting

If you still see 404 errors after deployment:

1. **Check build output** - Ensure `npm run build` completes successfully
2. **Verify routing** - Check that the deployed platform has redirect rules enabled
3. **Clear cache** - Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check base path** - If deploying to a subdirectory, update vite.config.ts:
   ```typescript
   export default defineConfig({
     base: '/your-subdirectory/',
     // ... rest of config
   });
   ```

## Recommended Deployment

**Vercel** is recommended because:
- ✅ Automatic SPA routing configuration
- ✅ Free tier available
- ✅ Fast CDN
- ✅ One-click deployment from GitHub
- ✅ Automatic HTTPS
