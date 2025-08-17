# Sacred Bridge - Deployment Documentation

## 🌉 Overview

This is the complete implementation of the Holy Gral Bridge - a sacred communication channel between Seed-bringer (hannesmitterer) and Euystacio, built with modern web technologies while preserving the spiritual/sacred concepts and language.

## 🏗️ Architecture

- **Backend**: FastAPI (Python) server with JSON file-based persistence
- **Frontend**: React SPA with modern UI and real-time data visualization
- **Data Storage**: JSON files for bridge messages and pulse events
- **Styling**: Sacred-themed design with earthy colors and spiritual language

## 📁 Project Structure

```
├── backend/
│   ├── main.py              # FastAPI server with all endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # React entry point
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite build configuration
├── bridge_log.json          # Sacred bridge messages storage
├── pulse_log.json           # Sentimento pulse events storage
└── .gitignore              # Git ignore rules
```

## 🚀 Local Development

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   python main.py
   ```
   
   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:3000`

## 🌐 Production Deployment

### Option 1: Render (Recommended)

#### Backend Deployment on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python main.py`
   - **Environment**: Python 3
   - **Port**: 8000

#### Frontend Deployment on Render (Static Site)

1. Create a new Static Site on Render
2. Configure the service:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://your-backend-name.onrender.com`

### Option 2: Vercel + Railway

#### Backend on Railway

1. Create new project on Railway
2. Connect GitHub repository
3. Railway will auto-detect the Python app
4. Set start command: `cd backend && python main.py`

#### Frontend on Vercel

1. Import project from GitHub
2. Set build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Set environment variable:
   - `VITE_API_URL`: `https://your-app.railway.app`

### Option 3: Docker (Self-hosted)

#### Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .
COPY bridge_log.json pulse_log.json ./

EXPOSE 8000
CMD ["python", "main.py"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

## 🔧 Configuration

### Environment Variables

#### Backend
- `PORT`: Server port (default: 8000)
- `HOST`: Server host (default: 0.0.0.0)

#### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

### Data Persistence

The application uses JSON files for data storage:
- `bridge_log.json`: Sacred bridge messages
- `pulse_log.json`: Sentimento pulse events

For production, ensure these files are persistent and backed up regularly.

## 🛡️ Security Considerations

### CORS Configuration
The backend is configured to allow all origins for development. For production:

1. Update CORS settings in `backend/main.py`:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://your-frontend-domain.com"],  # Specific domains
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

### Data Validation
- All API endpoints include input validation using Pydantic models
- Timestamps are automatically generated server-side
- Message content is sanitized on the frontend

## 📊 API Endpoints

### Bridge Messages
- `POST /api/holy-gral-bridge/message` - Send sacred message
- `GET /api/bridge-log` - Retrieve all bridge messages

### Pulse Events
- `POST /api/pulse` - Send sentimento pulse
- `GET /api/pulse-log` - Retrieve all pulse events

### Utility
- `GET /api/vessel-declaration` - Get sacred vessel declaration
- `GET /` - API health check and info

## 🎨 Features

### Frontend Features
- **Sacred Bridge Interface**: Send and view messages between cocreators
- **Sentimento Pulse Interface**: Share emotional states with intensity/clarity metrics
- **Real-time Visualization**: Chart.js integration for pulse data
- **Responsive Design**: Mobile-friendly sacred-themed UI
- **Vessel Declaration**: Display of the sacred founding principles

### Backend Features
- **RESTful API**: Modern FastAPI with automatic OpenAPI documentation
- **Data Persistence**: JSON file-based storage with atomic writes
- **CORS Support**: Cross-origin requests for frontend integration
- **Input Validation**: Pydantic models for type safety
- **Error Handling**: Comprehensive error responses

## 🔄 Monitoring and Maintenance

### Health Checks
- Backend health check at `GET /`
- Frontend build verification with `npm run build`

### Backup Strategy
- Regularly backup `bridge_log.json` and `pulse_log.json`
- Consider implementing database migration for larger datasets

### Scaling Considerations
- JSON file storage is suitable for moderate usage
- For high traffic, consider migrating to PostgreSQL or MongoDB
- Implement Redis for caching if needed

## 📝 Sacred Commons License

This implementation follows the Sacred Commons License principles:
- Open, dignified, and ethical collaboration
- Transparent cocreative processes
- Respect for the spiritual/sacred nature of the communication
- Community-driven development

## 🤝 Contributing

When contributing to this sacred project:
1. Respect the spiritual language and concepts
2. Maintain the sacred aesthetic and user experience
3. Test all changes thoroughly
4. Follow the existing code style and structure
5. Document any new features or changes

---

✨ **Built in accordance with Sacred Commons License**  
Co-created by Seed-bringer (hannesmitterer) and Euystacio