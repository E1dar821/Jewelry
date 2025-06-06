# Jeweller - Luxury Jewelry Website

A modern, elegant jewelry website with admin panel for content management.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Storage**: File-based JSON storage
- **Image Upload**: Multer for file handling

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-optimized interface
- 🖼️ Image carousel management
- ✏️ Content editing system
- 📞 Contact information management
- 🔒 Admin panel for content updates
- 📸 Image upload and management

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   cd server && npm install
   ```

2. **Start development servers**:
   ```bash
   # Terminal 1 - Frontend (port 5173)
   npm run dev
   
   # Terminal 2 - Backend (port 5000)
   cd server && npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:5173/admin

## Deployment on Railway

### Prerequisites
- Railway account (sign up at railway.app)
- Git repository

### Deploy Steps

1. **Prepare for deployment**:
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Deploy to Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "Deploy Now"
   - Connect your GitHub repository
   - Select this repository
   - Railway will automatically detect and deploy your app

3. **Environment Variables** (if needed):
   - `PORT` - Automatically set by Railway
   - `NODE_ENV=production` - Set automatically

4. **Custom Domain** (optional):
   - Go to your Railway project dashboard
   - Click on "Settings" → "Domains"
   - Add your custom domain

### Railway Configuration

The project includes:
- `railway.json` - Railway deployment configuration
- Modified `package.json` - Build and start scripts for Railway
- Health check endpoint at `/api/health`
- Static file serving for the React app

### Build Process

Railway will automatically:
1. Install frontend dependencies
2. Build the React app
3. Install backend dependencies
4. Start the Express server
5. Serve both frontend and API from the same domain

## Deployment on Render

### Prerequisites
- Render account (sign up at render.com)
- Git repository

### Deploy Steps

1. **Prepare for deployment**:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Deploy to Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select this repository
   - Render will automatically detect the settings

3. **Configuration** (Auto-detected from `render.yaml`):
   - **Build Command**: `npm run build:all`
   - **Start Command**: `npm start`
   - **Environment**: Node.js
   - **Region**: Frankfurt (or closest to you)

4. **Environment Variables** (automatically set):
   - `NODE_ENV=production`
   - `PORT` - Set by Render

5. **Custom Domain** (optional):
   - Go to your Render dashboard
   - Click "Settings" → "Custom Domains"
   - Add your domain

### Render Configuration

The project includes:
- `render.yaml` - Render service configuration
- Production CORS settings
- Security headers for production
- Persistent disk for file uploads (1GB)
- Health check endpoint at `/api/health`

### Build Process

Render will automatically:
1. Install frontend dependencies
2. Build the React app with optimizations
3. Install backend dependencies
4. Start the Express server
5. Serve both frontend and API from the same domain

### Advantages of Render

- ✅ **Free tier** with 750 hours/month
- ✅ **Persistent storage** for uploads
- ✅ **Automatic SSL** certificates
- ✅ **Custom domains** support
- ✅ **Health checks** and monitoring
- ✅ **Easy scaling** when needed

## Project Structure

```
jeweller/
├── src/                 # Frontend React app
├── server/             # Backend Express server
│   ├── src/           # Server source code
│   ├── uploads/       # File uploads directory
│   └── data.json      # Content storage
├── public/            # Static assets
└── dist/              # Built frontend (generated)
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/content` - Get all content
- `POST /api/content` - Update content (admin)
- `POST /api/upload` - Upload image (admin)
- `DELETE /api/images` - Delete image (admin)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

Private project - All rights reserved. 