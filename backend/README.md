# iTunes Search Backend API

A modern, clean REST API built with **NestJS**, **TypeORM**, and **PostgreSQL** that integrates with the iTunes Search API to search, store, and retrieve media content using an optimized two-table database structure.

## 🚀 Features

- **Two-Table Database Structure** - Optimized data organization with separate search history and results tables
- **Search iTunes API** - Search for podcasts, music, movies, and more
- **Smart Caching** - Duplicate search detection and cached result retrieval
- **Database Storage** - Automatically store search results with proper relationships
- **Search History Tracking** - Complete search parameter tracking and result analytics
- **Modern TypeScript** - Full type safety and clean interfaces
- **Error Handling** - Comprehensive error handling and validation
- **RESTful Design** - Clean, consistent API endpoints

## 🏗️ Database Architecture

### Two-Table Structure
The application uses an optimized two-table structure:

1. **search_history** - Main table storing search parameters and metadata
2. **search_results** - Child table storing individual iTunes results

This provides better organization, reduced redundancy, and improved performance.

## 🏗️ Project Structure

```
src/
├── itunes-search/
│   ├── entities/
│   │   ├── search-history.entity.ts    # Main search data entity
│   │   └── search-result.entity.ts     # Individual results entity
│   ├── interfaces/
│   │   └── itunes-api.interface.ts     # iTunes API types
│   ├── types/
│   │   └── api-response.types.ts       # Clean response types
│   ├── dto/
│   │   └── search-query.dto.ts         # Request validation
│   ├── itunes-search.controller.ts     # REST endpoints
│   ├── itunes-search.service.ts        # Business logic
│   └── itunes-search.module.ts         # Module configuration
├── app.module.ts                       # Main app module
└── main.ts                             # Application entry point
```

## 🛠️ Tech Stack

- **NestJS** - Modern Node.js framework
- **TypeORM** - Database ORM with TypeScript support
- **PostgreSQL** - Advanced relational database
- **Axios** - HTTP client for iTunes API
- **TypeScript** - Type-safe development

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE itunes_search_db ENCODING 'UTF8' LC_COLLATE 'en_US.UTF-8' LC_CTYPE 'en_US.UTF-8';"

# Run migration if upgrading from single-table structure
psql -U postgres -d itunes_search_db -f database-migration.sql
```

**Need help with PostgreSQL setup?** See [TWO_TABLE_STRUCTURE.md](./TWO_TABLE_STRUCTURE.md) for detailed documentation.

### 3. Configure Environment (Optional)
Create `.env` file or use defaults:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=itunes_search_db
PORT=3000
```

### 4. Start the Application
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 🔥 API Endpoints

### 1. Search iTunes Content

**POST** `/api/itunes/search`
```json
{
  "term": "فنجان",
  "media": "podcast",
  "country": "US",
  "limit": 50
}
```

**GET** `/api/itunes/search?term=فنجان&media=podcast&limit=10`

Returns a SearchHistory object with nested results.

### 2. Get All Searches

**GET** `/api/itunes/searches`

Returns all search records with their complete results.

### 3. Get Search by ID

**GET** `/api/itunes/search/{id}`

Returns a specific search record with all its results.

### 4. Get Search History Summary

**GET** `/api/itunes/history`

Returns search terms with result counts (summary view).

### 5. Get Searches by Term

**GET** `/api/itunes/results/{searchTerm}`

Returns all search records matching the search term.

## 📊 Response Format

All endpoints return consistent JSON responses:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "searchTerm": "فنجان",
    "media": "podcast",
    "country": "US",
    "limit": 50,
    "resultCount": 25,
    "createdAt": "2024-01-15T10:30:00Z",
    "results": [
      {
        "id": 1,
        "trackId": 1436487555,
        "artistName": "شبكة ثمانية",
        "trackName": "فنجان مع عبدالرحمن أبومالح",
        // ... other iTunes fields
      }
    ]
  },
  "message": "Found 25 results for \"فنجان\"",
  "count": 25
}
```

## 🎯 Media Types

- `podcast` - Podcasts
- `music` - Music tracks
- `movie` - Movies
- `audiobook` - Audiobooks
- `tvShow` - TV shows
- `software` - Applications
- `ebook` - E-books
- `all` - All media types (default)

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Test the two-table API structure
node test-two-table-api.js
```

### Manual Testing with curl

```bash
# Search for content
curl -X POST http://localhost:3000/api/itunes/search \
  -H "Content-Type: application/json" \
  -d '{"term": "فنجان", "media": "podcast", "limit": 5}'

# Get all searches with results
curl http://localhost:3000/api/itunes/searches

# Get specific search by ID
curl http://localhost:3000/api/itunes/search/1

# Get search history summary
curl http://localhost:3000/api/itunes/history
```

## 📱 Example: Searching for Fnjan Podcast

```bash
curl -X POST http://localhost:3000/api/itunes/search \
  -H "Content-Type: application/json" \
  -d '{
    "term": "فنجان",
    "media": "podcast",
    "country": "US",
    "limit": 10
  }'
```

## 🔒 Database Schema

### search_history Table
```sql
CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    searchTerm VARCHAR(255) NOT NULL,
    media VARCHAR(50) DEFAULT 'all',
    country VARCHAR(50) DEFAULT 'US',
    "limit" INTEGER DEFAULT 50,
    resultCount INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### search_results Table
```sql
CREATE TABLE search_results (
    id SERIAL PRIMARY KEY,
    searchHistoryId INTEGER NOT NULL,
    trackId BIGINT NOT NULL,
    artistName VARCHAR(500),
    collectionName VARCHAR(500),
    trackName VARCHAR(500),
    artworkUrl30 TEXT,
    artworkUrl60 TEXT,
    artworkUrl100 TEXT,
    collectionViewUrl TEXT,
    trackViewUrl TEXT,
    primaryGenreName VARCHAR(255),
    country VARCHAR(255),
    releaseDate TIMESTAMP,
    // ... other iTunes fields
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (searchHistoryId) REFERENCES search_history(id) ON DELETE CASCADE
);
```

## 📄 Documentation

- [TWO_TABLE_STRUCTURE.md](./TWO_TABLE_STRUCTURE.md) - Complete two-table structure documentation
- [database-migration.sql](./database-migration.sql) - Migration script from single to two-table structure
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Detailed API documentation

## 🚀 Key Benefits

1. **Optimized Performance** - Separate tables for better query performance
2. **Reduced Redundancy** - Search parameters stored once per search
3. **Smart Caching** - Automatic duplicate detection and cached responses
4. **Comprehensive Tracking** - Complete search parameter and result history
5. **Scalable Architecture** - Designed for large result sets and high traffic

## 🔧 Development

```bash
# Run in development mode
npm run start:dev

# Build for production
npm run build

# Run tests
npm test
```
