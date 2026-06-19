@echo off
echo ============================================
echo   DEPLOYING FIX TO VERCEL
echo ============================================
echo.

cd "z:\MY FILES\AI House\Telegram Course Seller"

echo [1/4] Staging files...
git add admin/src/api.ts
git add admin/src/pages/SetupPage.tsx
git add admin/src/pages/DashboardPage.tsx
git add admin/src/pages/OrdersPage.tsx

echo [2/4] Committing...
git commit -m "fix: Use Vercel proxy for API calls to fix 405 errors"

echo [3/4] Pushing to GitHub...
git push origin main

echo.
echo [4/4] Done! Vercel is now building...
echo.
echo ============================================
echo   NEXT STEPS:
echo ============================================
echo 1. Wait 1-2 minutes for Vercel to deploy
echo 2. Go to: https://nilexis-admin.vercel.app
echo 3. Press Ctrl+Shift+R to hard refresh
echo 4. Log out and log in with ID: 387957921
echo 5. Test all pages
echo ============================================
echo.
pause
