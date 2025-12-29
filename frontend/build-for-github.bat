@echo off
cd /d C:\Users\akram\OneDrive\Desktop\projects\SpeakUp\frontend
echo ========================================
echo Building CiviConnect for GitHub Pages
echo ========================================
echo.
echo Step 1: Building project...
call npm run build
echo.
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.
echo Step 2: Deploy to GitHub Pages...
call npm run deploy
echo.
if errorlevel 1 (
    echo Deploy failed!
    pause
    exit /b 1
)
echo ========================================
echo Deployment Complete!
echo Your site should be live at:
echo https://SkAkramali.github.io/SpeakUp
echo ========================================
pause
