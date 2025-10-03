# Vercel Deployment Guide

This guide will help you deploy the LinkedIn Content Formatter Tool to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm i -g vercel`
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? No
   - Project name: `linkedin-content-formatter` (or your preferred name)
   - Directory: `.` (current directory)
   - Override settings? No

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure build settings**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Deploy**

## Project Structure for Vercel

```
linkedin-content-formatter/
├── api/
│   └── index.py              # Serverless API handler
├── frontend/                 # React app
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── backend/                  # Python backend (for reference)
├── vercel.json              # Main Vercel config
└── requirements.txt         # Python dependencies
```

## Environment Variables

No environment variables are required for basic functionality. The app will work out of the box.

## API Endpoints

Once deployed, your API will be available at:
- `https://your-app.vercel.app/api/format` - Format content
- `https://your-app.vercel.app/api/validate` - Validate content  
- `https://your-app.vercel.app/api/templates` - Get templates

## Custom Domain (Optional)

1. **Go to your project dashboard on Vercel**
2. **Click "Domains" tab**
3. **Add your custom domain**
4. **Configure DNS records as instructed**

## Troubleshooting

### Build Issues

If you encounter build issues:

1. **Check Python version**: Vercel uses Python 3.9 by default
2. **Verify dependencies**: Ensure all packages in `requirements.txt` are compatible
3. **Check logs**: View build logs in Vercel dashboard

### API Issues

If API calls fail:

1. **Check CORS**: The API includes CORS headers
2. **Verify routes**: Ensure `/api/*` routes are properly configured
3. **Test locally**: Use `vercel dev` to test locally

### Frontend Issues

If the frontend doesn't load:

1. **Check build output**: Ensure `frontend/build` directory exists
2. **Verify routing**: Check that all routes are properly configured
3. **Check console**: Look for JavaScript errors in browser console

## Local Development with Vercel

To test the Vercel deployment locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Start local development server
vercel dev
```

This will start both the frontend and API locally using Vercel's development environment.

## Performance Optimization

1. **Enable caching**: Vercel automatically caches static assets
2. **Optimize images**: Use Vercel's Image Optimization
3. **Monitor performance**: Use Vercel Analytics

## Security Considerations

1. **API Rate Limiting**: Consider implementing rate limiting for production
2. **Input Validation**: The API validates all inputs
3. **CORS**: Properly configured for cross-origin requests

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Function Logs**: Monitor API function logs
3. **Performance**: Track Core Web Vitals

## Updates and Maintenance

To update your deployment:

1. **Push changes to your Git repository**
2. **Vercel will automatically redeploy**
3. **Or manually trigger deployment from dashboard**

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues**: Create an issue in this repository
