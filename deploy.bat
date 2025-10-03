@echo off
echo Deploying LinkedIn Content Formatter to Vercel...
echo.

echo Checking if Vercel CLI is installed...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo Failed to install Vercel CLI. Please install manually.
        pause
        exit /b 1
    )
)

echo.
echo Logging in to Vercel...
vercel login

echo.
echo Deploying to Vercel...
vercel

echo.
echo Deployment completed!
echo.
echo To deploy to production, run: vercel --prod
echo.
pause
