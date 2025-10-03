# Clipsy - LinkedIn Content Formatter Tool

A web application that helps users create and format LinkedIn-friendly content with perfect display, fonts, and alignment when pasted into LinkedIn.

## 🚀 Features

- **Rich Text Editor** with live preview
- **LinkedIn-Specific Formatting** (Unicode bold/italic characters)
- **One-Click Copy** with formatting preservation
- **Template System** for common post types
- **Content Validation** and LinkedIn compatibility checks
- **Mobile-Responsive Design**
- **Real-time Character Counting**
- **Smart Formatting Suggestions**

## 🛠 Tech Stack

- **Backend**: Python FastAPI
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📋 How to Use

1. **Start Writing**: Type your content in the editor on the left
2. **Use Formatting**: 
   - `**bold text**` for bold
   - `*italic text*` for italic
   - `#hashtag` for hashtags
   - Use the formatting toolbar for quick inserts
3. **Preview**: See exactly how your content will look on LinkedIn
4. **Copy**: Click "Copy to Clipboard" to copy formatted content
5. **Templates**: Use pre-built templates for common post types

## 🎯 LinkedIn Formatting Features

### Unicode Character Conversion
- **Bold**: `**text**` → 𝗧𝗲𝘅𝘁
- **Italic**: `*text*` → 𝘛𝘦𝘹𝘵
- **Preserves**: Emojis, hashtags, links, line breaks

### Smart Formatting
- Converts HTML tags to Unicode
- Handles line breaks properly for LinkedIn
- Removes problematic characters
- Validates character limits (3,000 max)

## 📁 Project Structure

```
linkedin-formatter/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── routes/              # API endpoints
│   │   │   ├── formatter.py     # Content formatting API
│   │   │   └── templates.py     # Template management API
│   │   └── services/            # Business logic
│   │       ├── formatter.py     # LinkedIn formatting engine
│   │       ├── validator.py     # Content validation
│   │       └── templates.py     # Template management
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Editor/          # Text editor components
│   │   │   ├── Preview/         # LinkedIn preview
│   │   │   └── Templates/       # Template gallery
│   │   ├── context/             # React context
│   │   ├── services/            # API services
│   │   └── utils/               # Utility functions
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Content Formatting
- `POST /api/format` - Format content for LinkedIn
- `POST /api/validate` - Validate content for LinkedIn compatibility

### Templates
- `GET /api/templates` - Get available templates
- `GET /api/templates/{id}` - Get specific template
- `POST /api/templates` - Create custom template

## 🎨 Built-in Templates

- **Product/Service Announcement**
- **Personal Story/Experience**
- **Industry Tips/Advice**
- **Thought Leadership**
- **Behind the Scenes**
- **Achievement/Celebration**

## 🔍 Content Validation

The tool automatically checks for:
- Character count limits
- Problematic characters
- Formatting issues
- LinkedIn compatibility
- Engagement suggestions

## 🚀 Deployment

### Deploy to Vercel (Recommended)

**Quick Deploy:**
```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

**Manual Deploy:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Alternative Deployments

**Backend Deployment:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Frontend Deployment:**
```bash
cd frontend
npm run build
# Serve the build folder with your preferred web server
```

### Vercel Configuration

The project is pre-configured for Vercel deployment with:
- ✅ Serverless API functions
- ✅ Static frontend build
- ✅ Automatic routing
- ✅ CORS configuration
- ✅ Python dependencies

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure both backend and frontend are running
3. Verify all dependencies are installed
4. Check the API documentation at http://localhost:8000/docs
