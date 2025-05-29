# iTunes Search API

A production-ready REST API built with **NestJS**, **TypeORM**, and **PostgreSQL** that provides intelligent iTunes content search with caching, filtering, and comprehensive result management.

## 🚀 Features

- **Smart iTunes Integration** - Search music, podcasts, movies, audiobooks, and more
- **Two-Table Architecture** - Optimized database design for performance and scalability
- **Intelligent Caching** - Prevents duplicate API calls and improves response times
- **Unicode Support** - Full support for Arabic, Chinese, and all international characters
- **Advanced Filtering** - Automatically filters invalid results (e.g., audiobooks without trackId)
- **Production Ready** - Comprehensive error handling, logging, and validation

## 🔗 Live API

**🌐 Production URL:** `https://itunes-search-app-1hcy.onrender.com/`

Try it now:
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=كلمتك+ياوحش&limit=5"
```

## 🏗️ Architecture

### Database Design
```
┌─────────────────┐    ┌─────────────────┐
│  SearchHistory  │───▶│  SearchResult   │
│                 │    │                 │
│ • id            │    │ • id            │
│ • searchTerm    │    │ • searchHistoryId│
│ • limit         │    │ • trackId       │
│ • resultCount   │    │ • artistName    │
│ • createdAt     │    │ • trackName     │
│ • updatedAt     │    │ • ... (iTunes)  │
└─────────────────┘    └─────────────────┘
```


## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **NestJS** | Modern Node.js framework with dependency injection |
| **TypeORM** | Type-safe database ORM with PostgreSQL support |
| **PostgreSQL** | Robust relational database with JSON support |
| **Axios** | HTTP client for iTunes API integration |
| **TypeScript** | Static typing for enhanced development experience |

## 📋 Prerequisites

- **Node.js** v16+ 
- **PostgreSQL** v12+
- **npm** or **yarn**

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd itunes-search-app/backend
npm install
```

### 2. Database Setup
```bash
# Create database
createdb itunes_search_db

# Or with psql
psql -U postgres -c "CREATE DATABASE itunes_search_db;"
```


### ٣. Start Application
```bash
# Development
npm run start:dev

# Production
npm run build && npm run start:prod
```

🌐 **Production API:** `https://itunes-search-app-1hcy.onrender.com/`

## 🔥 API Reference

### Core Endpoints

#### 🔍 Search iTunes Content
```http
GET /api/itunes/search?term={query}&limit={number}&media={type}&country={code}
```

**Parameters:**
- `term` (required) - Search query (supports Unicode)
- `limit` (optional) - Results limit (1-200, default: 50)
- `media` (optional) - Media type filter
- `country` (optional) - Country code (US, GB, etc.)

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Beatles&limit=5"
```

#### 📊 Get All Searches
```http
GET /api/itunes/searches
```
Returns all search records with complete results.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/searches"
```

#### 🎯 Get Search by ID
```http
GET /api/itunes/search/{id}
```
Returns specific search with all associated results.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search/1"
```

#### 📈 Search History Summary
```http
GET /api/itunes/history
```
Returns search terms with result counts.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/history"
```

#### 🔎 Results by Search Term
```http
GET /api/itunes/results/{searchTerm}
```
Returns all searches matching the term.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/results/Beatles"
```

### Response Format

```json
{
  "id": 1,
  "searchTerm": "Beatles",
  "limit": 50,
  "resultCount": 48,
  "createdAt": "2024-01-15T10:30:00Z",
  "results": [
    {
      "id": 1,
      "trackId": 382223083,
      "artistName": "The Beatles",
      "trackName": "Hey Jude",
      "collectionName": "1 (Remastered)",
      "artworkUrl100": "https://...",
      "trackPrice": 1.29,
      "releaseDate": "1968-08-26T07:00:00Z",
      "primaryGenreName": "Rock"
    }
  ]
}
```

## 🎯 Media Types

| Type | Description |
|------|-------------|
| `all` | All media types (default) |
| `music` | Songs and albums |
| `podcast` | Podcast episodes |
| `movie` | Movies and films |
| `audiobook` | Audio books |
| `tvShow` | TV shows and series |
| `software` | Mobile apps |
| `ebook` | Digital books |

## 🌍 International Support

Full Unicode support for all languages:

```bash
# Arabic
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=فنجان"

# Japanese
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=音楽"

```


## 🧪 Testing

The application has been thoroughly tested with a comprehensive test suite covering:

- ✅ All 5 API endpoints
- ✅ Unicode/Arabic character support
- ✅ Error handling and validation
- ✅ Caching behavior
- ✅ Edge cases and limits
- ✅ Type safety and data integrity

**100% test pass rate** - Production ready!

## 🚀 Production Deployment



### Health Monitoring
- Comprehensive logging with NestJS Logger
- Error tracking and graceful failure handling
- Database connection health checks

## 🔧 Development

### Project Structure
```
src/
├── itunes-search/
│   ├── entities/           # Database models
│   ├── dto/               # Request validation
│   ├── interfaces/        # TypeScript interfaces
│   ├── types/            # Response types
│   ├── *.controller.ts   # REST endpoints
│   ├── *.service.ts      # Business logic
│   └── *.module.ts       # Module configuration
├── app.module.ts         # Root module
└── main.ts              # Application entry
```

### Key Scripts
```bash
npm run start:dev      # Development with hot reload
npm run build          # Production build
npm run start:prod     # Production mode
npm run lint           # Code linting
npm run format         # Code formatting
```

## 📝 API Examples

### Search with Filtering
```bash
# Music only, limit 10
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=jazz&media=music&limit=10"

# Podcasts from specific country
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=tech&media=podcast&country=US"

# Movies with higher limit
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=marvel&media=movie&limit=20"
```

### Get Analytics
```bash
# Search history summary
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/history"

# All Beatles searches
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/results/Beatles"

# Get specific search by ID
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search/1"
```

### Advanced Usage
```bash
# Complex search with multiple parameters
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Taylor%20Swift&media=music&country=US&limit=25"

# Search audiobooks
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Harry%20Potter&media=audiobook"

# TV Shows search
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Friends&media=tvShow"
```
Fast response times worldwide via Render.com



## 🌟 Quick Test

Try these endpoints right now:

1. **Search Beatles music:**
   ```bash
   curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Beatles&limit=3"
   ```

2. **Get search history:**
   ```bash
   curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/history"
   ```

3. **Search Arabic content:**
   ```bash
   curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=أم%20كلثوم"
   ```

---
