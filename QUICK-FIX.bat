@echo off
setlocal enabledelayedexpansion

echo =====================================================
echo   FIXING ADMIN PANEL - AUTO MODE
echo =====================================================
echo.

cd /d "z:\MY FILES\AI House\Telegram Course Seller"

echo [Step 1/3] Staging all changes...
git add -A 2>nul
if errorlevel 1 (
    echo Error: Git add failed
    pause
    exit /b 1
)

echo [Step 2/3] Committing...
git commit -m "fix: Add Vercel proxy and response validation for admin auth" 2>nul
if errorlevel 1 (
    echo Warning: No changes to commit or already committed
)

echo [Step 3/3] Pushing to GitHub...
git push origin main 2>nul
if errorlevel 1 (
    echo Error: Git push failed
    echo.
    echo Please check:
    echo - Are you connected to internet?
    echo - Do you have Git credentials set up?
    pause
    exit /b 1
)

echo.
echo =====================================================
echo   CODE PUSHED! Now do these steps:
echo =====================================================
echo.
echo 1. Go to https://vercel.com/dashboard
echo 2. Click on "nilexis-admin" project
echo 3. Click "Settings" ^> "Environment Variables"
echo 4. Add:
echo    Key:   VITE_ADMIN_IDS
echo    Value: 387957921
echo    Environments: Check ALL THREE boxes
echo 5. Click "Save"
echo 6. Go to "Deployments" tab
echo 7. Click latest deployment "..." menu
echo 8. Click "Redeploy"
echo 9. Wait 2 minutes
echo 10. Go to https://nilexis-admin.vercel.app
echo 11. Press Ctrl+Shift+R
echo 12. Login with: 387957921
echo.
echo =====================================================
pause
