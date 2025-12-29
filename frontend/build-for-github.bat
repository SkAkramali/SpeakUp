@echo off
cd /d C:\Users\akram\OneDrive\Desktop\projects\SpeakUp\frontend
echo Installing gh-pages...
call npm install gh-pages --save-dev
echo.
echo Building project...
call npm run build
echo.
echo Done! Your dist folder is ready for GitHub Pages.
pause
