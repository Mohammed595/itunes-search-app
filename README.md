# iTunes Search App => For Thamanyah

A modern, full-stack application for searching iTunes content. Built with NestJS backend and Next.js frontend.


## 🚀 Live Demo

- **Frontend**: [https://itunes-search-app-frontend.vercel.app](https://itunes-search-app-frontend.vercel.app)
- **Backend API**: [https://itunes-search-app-1hcy.onrender.com](https://itunes-search-app-1hcy.onrender.com)

## 🛠 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **iTunes Search API** - Official Apple iTunes API integration
- **CORS** - Cross-origin resource sharing support

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Hooks** - React state management
- **Responsive Grid** - Adaptive layout system

## 📁 Project Structure

```
itunes-search-app/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── main.ts
│   │   └── itunes/
│   │       ├── itunes.controller.ts
│   │       ├── itunes.module.ts
│   │       └── itunes.service.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResultCard.tsx
│   │   │   └── SearchResults.tsx
│   │   ├── hooks/
│   │   │   └── useSearch.ts
│   │   ├── services/
│   │   │   └── searchService.ts
│   │   └── types/
│   │       └── search.ts
│   ├── package.json
│   └── tailwind.config.js
├── shared/                  # Shared Types
│   └── types/
│       └── itunes.types.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/itunes-search-app.git
   cd itunes-search-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**

   **Backend** (optional):
   ```bash
   cd backend
   # add .env (uploded on google drive)
   
   ```


4. **Start Development Servers**
   ```bash
   # From root directory
   npm run dev
   ```
   
   Or run separately:
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run start:dev
   
   # Frontend (Terminal 2) 
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3002

## 🌐 Production Deployment

### Backend (Render)

1. Push your code to GitHub
2. Connect your repository to Render
3. Set the following environment variables:
   ```
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   PORT=3002
   * all env vars will be in google drive
   ```
4. Deploy with build command: `npm install && npm run build`
5. Start command: `npm run start:prod`

### Frontend (Vercel)

1. Connect your repository to Vercel
2. Deploy automatically on push to main branch

## 📋 API Documentation

### Search Endpoint

**GET** `/api/itunes/search`

**Parameters:**
- `term` (required): Search query string
- `limit` (optional): Number of results (default: 20, max: 200)

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=taylor%20swift&limit=10"
```

**Response:**
```json
{
  "resultCount": 10,
  "results": [
    {
      "trackId": 123456,
      "trackName": "Song Name",
      "artistName": "Artist Name",
      "artworkUrl100": "https://...",
      "trackPrice": 1.29,
      "currency": "USD",
      "kind": "song"
    }
  ]
}
```

### Interactive Elements
- **Search Bar**: Real-time search with debouncing
- **Result Cards**: Hover animations with scale effects
- **Loading States**: Beautiful loading animations
- **Error Handling**: User-friendly error messages

## 🧪 Available Scripts

### Root Level
```bash
npm run dev          # Start both backend and frontend
npm run build        # Build both applications
npm run start        # Start both in production mode
```

### Backend
```bash
npm run start        # Start in production
npm run start:dev    # Start in development with watch
npm run start:debug  # Start in debug mode
npm run build        # Build the application
npm run test         # Run tests
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```
