# Parkhill Web Hub

Parkhill Web Hub is a full-stack web application showcasing technology programs and solutions. It consists of a Node.js/Express backend with MongoDB database and a React/TypeScript frontend using Vite and Chakra UI.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup
- Node.js v20+ is required (v20.19.4 confirmed working)
- MongoDB database connection (local or Docker)
- Docker (optional but recommended for MongoDB)

### Install Dependencies
- Backend: `cd backend && npm install` (takes ~4 seconds)
- Frontend: `cd frontend && npm install` (takes ~11 seconds, may show 12 vulnerabilities - these are acceptable)

### Database Setup
**CRITICAL**: The application requires MongoDB to function. Choose one method:

#### Option 1: Docker MongoDB (Recommended)
```bash
docker run --name mongodb-parkhill -p 27017:27017 -d mongo:7.0
```

#### Option 2: Local MongoDB Installation
MongoDB installation varies by system. On Ubuntu/Debian systems, the standard `mongodb` package is not available. Docker is recommended for consistency.

### Configuration
Create `backend/config.json` with MongoDB connection:
```json
{"MONGO_DB_API_KEY": "mongodb://localhost:27017/parkhill-web-hub"}
```

**NOTE**: `config.json` is gitignored and must be created manually for each environment.

### Building and Running

#### Frontend Build
- `cd frontend && npm run build` (takes ~8 seconds. NEVER CANCEL)
- TypeScript compilation followed by Vite production build
- Outputs to `frontend/dist/` directory
- Build warnings about "use client" directives are expected and can be ignored

#### Development Servers
1. **Start MongoDB** (if using Docker): `docker start mongodb-parkhill`
2. **Backend API**: `cd backend && npm start` (starts on port 3000)
   - Alternative dev mode: `cd backend && npm run dev` (uses nodemon for auto-restart)
3. **Frontend**: `cd frontend && npm run dev` (starts on http://localhost:5173)

**NEVER CANCEL**: Allow servers adequate time to start. Backend connects to MongoDB in ~2-5 seconds.

#### Production Frontend
- After building: `cd frontend && npm run preview` (serves production build)

## Testing and Validation

### Manual Testing Requirements
**ALWAYS test the complete user workflow after making changes:**

1. **Database Connection**: Verify backend starts without MongoDB connection errors
2. **API Endpoints**: Test sectors and programs endpoints respond with valid JSON
3. **Frontend Functionality**: 
   - Load http://localhost:5173
   - Verify program cards display correctly
   - Test sector filtering (sidebar navigation)
   - Test search functionality
   - Test external website links open correctly
4. **End-to-End Scenario**: Add test data, filter by sector, search programs, click website links

### API Testing Commands
```bash
# Test sectors API
curl -s http://localhost:3000/api/sectors

# Test programs API  
curl -s http://localhost:3000/api/programs

# Add test sector
curl -X POST http://localhost:3000/api/sectors -H "Content-Type: application/json" -d '{"name": "Technology"}'

# Add test program
curl -X POST http://localhost:3000/api/programs -H "Content-Type: application/json" -d '{"name": "Test Program", "developer": "Test Dev", "description": "Test description", "sectors": ["SECTOR_ID"], "websiteUrl": "https://example.com"}'
```

### Type Checking
- `cd frontend && npx tsc --noEmit` (validates TypeScript compilation without output)

## Common Issues and Solutions

### Backend Won't Start
- **Symptom**: "MongooseError: Operation buffering timed out"
- **Solution**: Ensure MongoDB is running and config.json exists with correct connection string

### Frontend Build Warnings
- **Symptom**: "Module level directives cause errors when bundled, 'use client' was ignored"
- **Solution**: These warnings are expected from React Query and can be ignored

### Empty Program List
- **Symptom**: Frontend loads but shows "No programs found"
- **Solution**: Database is empty. Add test data using API endpoints above

## Architecture Overview

### Backend (`/backend/`)
- **Framework**: Express.js with CORS enabled
- **Database**: MongoDB with Mongoose ODM
- **Models**: Program, Sector (see `models/` directory)
- **Routes**: `/api/programs`, `/api/sectors` (see `routes/` directory)
- **Port**: 3000 (configurable via PORT environment variable)

### Frontend (`/frontend/`)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4.x  
- **UI Library**: Chakra UI with custom theming
- **State Management**: React Query for server state
- **Components**: ProgramCard, GenreList, NavBar, ProgramGrid
- **Port**: 5173 (development), configurable for production

### Key Files
- `backend/index.js` - Express server entry point
- `backend/models/program.js` - Program data model
- `backend/models/sector.js` - Sector data model  
- `frontend/src/App.tsx` - Main React application
- `frontend/src/services/api-client.ts` - API integration
- `frontend/vite.config.ts` - Vite build configuration

## Development Workflow

### Making Changes
1. **Backend Changes**: Restart `npm start` or use `npm run dev` for auto-restart
2. **Frontend Changes**: Vite hot-reloads automatically
3. **Database Schema**: Update model files, may require data migration
4. **API Changes**: Update both backend routes and frontend api-client.ts

### Before Committing
- Verify backend starts successfully with MongoDB
- Run frontend build to check for compilation errors  
- Test complete user workflow manually
- Check that new functionality works with empty and populated database states

**Note**: No automated test suite exists. All validation must be done manually.

## Repository Structure

```
├── backend/                 # Express.js API server
│   ├── models/             # Mongoose data models
│   ├── routes/             # API route handlers
│   ├── middleware/         # Express middleware
│   ├── migrations/         # Database migration scripts
│   ├── startup/            # Application startup configuration
│   └── package.json        # Backend dependencies
├── frontend/               # React TypeScript application  
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client and services
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── package.json            # Root package.json (mostly empty)
```

## Quick Commands Reference

```bash
# Full application startup
docker run --name mongodb-parkhill -p 27017:27017 -d mongo:7.0
cd backend && echo '{"MONGO_DB_API_KEY": "mongodb://localhost:27017/parkhill-web-hub"}' > config.json
cd backend && npm install && npm start &
cd frontend && npm install && npm run dev

# Production build
cd frontend && npm run build && npm run preview

# Cleanup
docker stop mongodb-parkhill && docker rm mongodb-parkhill
```