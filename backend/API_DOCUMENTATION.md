# iTunes Search API Documentation

## Overview

The iTunes Search API is a comprehensive REST API that allows you to search for content in the iTunes store and manage search history. This API supports Arabic search terms and provides search functionality for various media types including music, movies, podcasts, audiobooks, and more.

## 🔗 Live API

**🌐 Production URL:** `https://itunes-search-app-1hcy.onrender.com/`  
**📚 Interactive Documentation:** `https://itunes-search-app-1hcy.onrender.com/api/docs`

## Features

- 🔍 **iTunes Content Search**: Search for music, movies, podcasts, TV shows, audiobooks, software, and ebooks
- 🌍 **Multi-language Support**: Full support for Arabic search terms
- 📊 **Search History**: Track and retrieve search history with detailed results
- 🗃️ **Database Storage**: PostgreSQL database with proper relationships
- 📝 **Comprehensive API Documentation**: Interactive Swagger UI documentation
- 🔄 **Caching**: Smart caching to avoid duplicate searches

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database
4. Start the application: `npm run start:dev`

### Access Points

- **API Base URL**: `https://itunes-search-app-1hcy.onrender.com/api/itunes`
- **Swagger Documentation**: `https://itunes-search-app-1hcy.onrender.com/api/docs`
- **Local Development**: `http://localhost:3000/api/itunes` (when running locally)

## API Endpoints

### 📚 Interactive Documentation

Visit `https://itunes-search-app-1hcy.onrender.com/api/docs` to access the complete interactive Swagger documentation where you can:

- Browse all available endpoints
- View detailed request/response schemas
- Test API endpoints directly in the browser
- See example requests and responses
- Download API specifications

### 🔍 Main Endpoints

#### 1. Search iTunes Content

**GET** `/api/itunes/search?term=طاش+ماطاش&media=music&country=SA&limit=25`

Alternative GET endpoint for searching with query parameters.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=طاش%20ماطاش&media=music&country=SA&limit=25"
```

#### 2. Search History

**GET** `/api/itunes/history`

Retrieve all unique search terms that have been searched.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/history"
```

**GET** `/api/itunes/searches`

Get all search history entries with their complete results.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/searches"
```

**GET** `/api/itunes/search/{id}`

Retrieve a specific search and its results by search ID.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search/1"
```

**GET** `/api/itunes/results/{searchTerm}`

Get all searches and results for a specific search term.

**Example:**
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/results/Beatles"
```

## Request/Response Examples

### Search Request (Arabic)

```json
POST /api/itunes/search
Content-Type: application/json

{
  "term": "طاش ماطاش",
  "media": "music",
  "country": "SA",
  "limit": 10
}
```

### Search Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "searchTerm": "طاش ماطاش",
    "media": "music",
    "country": "SA",
    "limit": 10,
    "resultCount": 8,
    "createdAt": "2024-01-01T12:00:00Z",
    "results": [
      {
        "id": 1,
        "trackId": 1234567890,
        "artistName": "فرقة طاش ما طاش",
        "trackName": "أغنية طاش ما طاش",
        "collectionName": "أجمل الأغاني",
        "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/100x100.jpg",
        "trackPrice": 1.29,
        "currency": "USD",
        "primaryGenreName": "Comedy",
        "country": "USA"
      }
    ]
  },
  "message": "Found 8 results for \"طاش ماطاش\"",
  "count": 8
}
```

## Live Testing Examples

Try these endpoints directly:

### 1. Search Beatles Music
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Beatles&limit=5"
```

### 2. Search Arabic Content
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=أم%20كلثوم&media=music"
```

### 3. Search Movies
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/search?term=Marvel&media=movie&limit=10"
```

### 4. Get Search History
```bash
curl "https://itunes-search-app-1hcy.onrender.com/api/itunes/history"
```

## Media Types

The API supports the following media types:

- `music` - Music tracks and albums
- `movie` - Movies
- `podcast` - Podcasts
- `musicVideo` - Music videos
- `audiobook` - Audiobooks
- `shortFilm` - Short films
- `tvShow` - TV shows and episodes
- `software` - iOS apps
- `ebook` - eBooks
- `all` - All media types (default)

## Country Codes

Use standard ISO country codes:
- `US` - United States (default)
- `SA` - Saudi Arabia
- `AE` - United Arab Emirates
- `EG` - Egypt
- And more...

## Error Handling

The API returns structured error responses:

```json
{
  "statusCode": 400,
  "message": "Search term is required",
  "error": "Bad Request"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (search ID not found)
- `500` - Internal Server Error

## Database Schema

The API uses a two-table PostgreSQL database structure:

### SearchHistory Table
- Stores search metadata (term, media, country, limit, result count)
- One-to-many relationship with SearchResult

### SearchResult Table
- Stores individual iTunes search results
- Many-to-one relationship with SearchHistory
- Contains all iTunes API response fields

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Run tests
npm run test

# Build for production
npm run build
```

### Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=itunes_search_db
```

## Testing with Swagger UI

1. Open `https://itunes-search-app-1hcy.onrender.com/api/docs`
2. Click on any endpoint to expand it
3. Click "Try it out" to test the endpoint
4. Fill in the required parameters
5. Click "Execute" to send the request
6. View the response in the browser

## Production Features

- ✅ **HTTPS Secured** - All API calls are encrypted
- ✅ **Global CDN** - Fast response times worldwide
- ✅ **Auto Scaling** - Handles traffic spikes automatically
- ✅ **Database Backup** - Automated PostgreSQL backups
- ✅ **Error Monitoring** - Comprehensive logging and monitoring

## Support

For API support and questions:
- Check the interactive documentation at `https://itunes-search-app-1hcy.onrender.com/api/docs`
- Review the request/response examples
- Ensure your request format matches the schema

## License

This project is licensed under the MIT License. 