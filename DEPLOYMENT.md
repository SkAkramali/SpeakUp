# GitHub Pages Deployment Fix

## Issue Fixed
The site was showing empty because React Router's `BrowserRouter` needed a `basename` prop to match the GitHub Pages subdirectory path.

## Changes Made

1. **Updated App.jsx**: Added `basename="/SpeakUp"` to BrowserRouter
2. **Updated build-for-github.bat**: Improved deployment script

## How to Deploy

### Option 1: Using the Batch File (Easiest)
1. Double-click `build-for-github.bat` in the frontend folder
2. Wait for build and deployment to complete

### Option 2: Manual Commands
Open Command Prompt (NOT PowerShell) and run:
```cmd
cd C:\Users\akram\OneDrive\Desktop\projects\SpeakUp\frontend
npm run build
npm run deploy
```

### Option 3: Enable PowerShell Scripts
If you prefer PowerShell, run this once as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## After Deployment

Your site will be available at: https://SkAkramali.github.io/SpeakUp

### If Still Not Working

1. **Check GitHub Pages Settings:**
   - Go to: https://github.com/SkAkramali/SpeakUp/settings/pages
   - Source should be: "Deploy from a branch"
   - Branch: `gh-pages` / `(root)`

2. **Wait a few minutes** - GitHub Pages can take 2-5 minutes to update

3. **Clear browser cache** or try incognito mode

## Configuration Summary

- **Base URL**: `/SpeakUp/`
- **Homepage**: https://SkAkramali.github.io/SpeakUp
- **Deploy Branch**: gh-pages
- **Build Output**: dist/

## Troubleshooting

### Site shows 404
- Make sure GitHub Pages is enabled in repository settings
- Verify the branch is set to `gh-pages`

### Blank page after deployment
- Clear browser cache
- Check browser console for errors (F12)
- Verify the build completed successfully

### Routes not working
- The basename fix should handle this
- Make sure to rebuild after the fix
