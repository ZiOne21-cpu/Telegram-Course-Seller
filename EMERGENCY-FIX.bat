@echo off
echo ========================================================
echo   EMERGENCY FIX - Bypass Authentication Temporarily
echo ========================================================
echo.
echo This will:
echo - Remove authentication requirement for ID 387957921
echo - Deploy to Railway backend
echo - Deploy to Vercel frontend
echo.
pause

cd /d "z:\MY FILES\AI House\Telegram Course Seller"

echo.
echo [1/5] Staging backend changes...
git add backend/src/middleware.ts

echo [2/5] Staging frontend changes...
git add admin/src/pages/LoginPage.tsx
git add admin/src/api.ts
git add admin/src/pages/*.tsx

echo [3/5] Committing...
git commit -m "fix: Bypass auth requirement for emergency access"

echo [4/5] Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub
    echo.
    echo Possible issues:
    echo - Not connected to internet
    echo - Git credentials not configured
    echo - Need to accept Git prompt
    echo.
    pause
    exit /b 1
)

echo.
echo [5/5] SUCCESS! Code pushed to GitHub
echo.
echo ========================================================
echo   NEXT STEPS:
echo ========================================================
echo.
echo Railway will auto-deploy in 1-2 minutes
echo Vercel will auto-deploy in 1-2 minutes
echo.
echo After 2 minutes:
echo.
echo 1. Go to: https://nilexis-admin.vercel.app
echo 2. Press: Ctrl + Shift + R (hard refresh)
echo 3. Enter ID: 387957921
echo 4. Click: Sign In
echo 5. Should work now!
echo.
echo ========================================================
echo.
pause
