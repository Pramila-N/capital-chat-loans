# 404 NOT_FOUND Error - Root Cause & Resolution

## The Issue
Your Vercel deployment was returning 404 because:
1. `dist/` folder excluded from git (`.gitignore`)
2. `vercel.json` was in `client/` subfolder instead of root
3. Vercel couldn't find build instructions
4. No `index.html` was generated on deployment
5. SPA routing rules weren't applied

## The Root Cause
**Build Configuration Mismatch**

```
❌ BEFORE:
├── client/
│   ├── vercel.json (Vercel ignores this - looks at root)
│   ├── src/
│   ├── dist/ (not in git)
│   └── package.json
└── .git/

✅ AFTER:
├── vercel.json (✨ Vercel sees this now!)
├── client/
│   ├── src/
│   ├── dist/ (still not in git - Vercel builds it)
│   └── package.json
└── .git/
```

## Why This Matters - Core Principle

**Source Code ≠ Build Artifacts**

- Keep in git: `src/`, `package.json`, `vite.config.ts` (source code)
- Exclude from git: `dist/`, `node_modules/` (build output)
- Deployment platform: Rebuilds from source each time

This is why:
- ✅ Smaller git repository
- ✅ Consistent builds (fresh dependencies)
- ✅ No merge conflicts on generated files
- ✅ Works across any platform (Vercel, Netlify, self-hosted)

## What Was Changed

### 1. Created Root `vercel.json`
```json
{
  "buildCommand": "cd client && npm run build",
  "devCommand": "cd client && npm run dev", 
  "installCommand": "cd client && npm install",
  "framework": "vite",
  "outputDirectory": "client/dist",
  "rewrites": [{
    "source": "/(.*)",
    "destination": "/index.html"
  }]
}
```

This tells Vercel:
1. Install dependencies: `cd client && npm install`
2. Build: `cd client && npm run build` (creates `dist/index.html`)
3. Serve from: `client/dist/`
4. Route everything to `index.html` (SPA routing)

### 2. Updated `.gitignore` (No Change Needed)
`dist/` remains excluded ✓ (should never be in git)

## What Happens On Next Deployment

1. Vercel sees root `vercel.json` ✅
2. Reads build command: `cd client && npm run build`
3. Installs dependencies ✅
4. Runs Vite build → generates `client/dist/index.html` ✅
5. Applies SPA rewrites (all routes → index.html) ✅
6. Serves from `client/dist/` ✅
7. 404 error resolved ✅

## How to Recognize This Error Pattern

### Warning Signs:
```
❌ "Works locally but 404 on deployment"
❌ "dist/ folder is in .gitignore"
❌ "Configuration file in subfolder, not root"
❌ "Build script not running on platform"
❌ "Inconsistent build output between environments"
```

### Similar Issues to Watch For:
```
❌ Environment variables not set on deployment
❌ Wrong Node version on deployment
❌ Different build output per platform
❌ Missing dependencies in package.json
❌ Hardcoded paths that differ between OS
```

## Recovery Checklist

- [x] Fixed build configuration (vercel.json at root)
- [x] Configured SPA routing rewrites
- [x] Pushed changes to GitHub
- [ ] **Next: Trigger new deployment on Vercel**
  - Go to Vercel Dashboard
  - Find your project
  - Click "Redeploy" or wait for auto-redeploy
  - Check deployment logs for success
- [ ] **Test the site**
  - Visit your Vercel URL
  - Navigate through pages
  - Refresh - should not show 404

## Going Forward

**Remember:**
- Source code lives in git
- Build artifacts are generated during deployment
- Configuration files tell the platform HOW to build
- Different subfolders? Use relative paths in build commands
- Every platform has its own config format (vercel.json, netlify.toml, etc.)

**For Future Projects:**
- Put build config files at PROJECT ROOT
- Exclude generated folders from git (.gitignore)
- Test build locally: `npm run build`
- Verify output directory is correct
- Always document build steps in README.md
