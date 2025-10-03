#!/bin/bash

echo "Deploying LinkedIn Content Formatter to Vercel..."
echo

echo "Checking if Vercel CLI is installed..."
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "Failed to install Vercel CLI. Please install manually."
        exit 1
    fi
fi

echo
echo "Logging in to Vercel..."
vercel login

echo
echo "Deploying to Vercel..."
vercel

echo
echo "Deployment completed!"
echo
echo "To deploy to production, run: vercel --prod"
echo
