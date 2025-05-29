# iTunes Search Frontend

A modern, dark-themed frontend application built with Next.js and TypeScript for searching iTunes content including music, movies, podcasts, and more.

## ✨ Features

- **Modern Dark Theme** - Sleek design with gradient backgrounds and glowing effects
- **Real-time Search** - Fast search functionality with iTunes API integration
- **Responsive Grid Layout** - Adaptive layout for mobile, tablet, and desktop
- **Loading States** - Smooth loading animations and user feedback
- **Error Handling** - Comprehensive error management with user-friendly messages
- **TypeScript** - Full type safety throughout the application
- **Clean Architecture** - Well-organized component structure and separation of concerns

## 🎨 Design

- Dark blue/black gradient background
- Cyan accent color (#00d4ff)
- Modern card-based layout with rounded corners
- Hover animations and scaling effects
- Custom scrollbar styling
- Backdrop blur effects

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/
│   ├── SearchBar.tsx      # Search input component
│   ├── SearchResultCard.tsx # Individual result card
│   └── SearchResults.tsx  # Results container with states
├── hooks/
│   └── useSearch.ts       # Custom hook for search logic
├── services/
│   └── searchService.ts   # API service layer
└── types/
    └── search.ts          # TypeScript interfaces
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Configuration

The frontend connects to the backend API running on `http://localhost:3002`. The API endpoint is configured in `src/services/searchService.ts`.

### Environment Variables

No environment variables are required for basic functionality.

## 📊 API Integration

The frontend communicates with the NestJS backend through:
- **Endpoint:** `http://localhost:3002/api/itunes/search`
- **Method:** GET
- **Parameters:** `term`, `limit`
- **Response:** JSON with search results

## 🎯 Usage

1. **Search:** Enter search terms in the search bar
2. **Browse Results:** View results in a responsive grid layout
3. **Interact:** Click preview links or iTunes store links
4. **Navigate:** Scroll through paginated results

## 🔄 State Management

The application uses React hooks for state management:
- `useSearch` - Custom hook managing search state, API calls, and error handling
- Local component state for UI interactions

## 🎨 Styling

### CSS Variables
```css
--bg-primary: #0f1419      /* Main background */
--bg-secondary: #1a1f29    /* Secondary background */
--bg-card: #232936         /* Card background */
--text-primary: #ffffff    /* Primary text */
--text-secondary: #b0b8c8  /* Secondary text */
--accent: #00d4ff          /* Accent color */
--border: #2d3748          /* Border color */
```

### Responsive Design
- Mobile: Single column layout
- Tablet: 2-column grid
- Desktop: 3-column grid

## 🚦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Debugging

The application includes comprehensive console logging for debugging:
- API request/response logging
- Search state tracking
- Error reporting

## 🔧 Development

### Adding New Components
1. Create component in `src/components/`
2. Export from component file
3. Import and use in parent components

### Updating Styles
1. Modify CSS variables in `globals.css`
2. Use Tailwind classes for component styling
3. Apply dark theme consistently

### API Changes
1. Update types in `src/types/search.ts`
2. Modify service calls in `src/services/searchService.ts`
3. Update component props if needed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Follow the existing code structure
2. Maintain TypeScript types
3. Use consistent styling patterns
4. Test across different screen sizes

## 📄 License

This project is part of the iTunes Search Application monorepo.
