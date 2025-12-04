# Diffrient Interiors - Digital Design Catalog

## Overview
A beautiful digital catalog for Diffrient Interiors, featuring a welcome screen and portfolio showcase with advanced filtering, smooth animations, and comprehensive sharing capabilities. This is a single-page catalog experience (not a multi-page website).

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js with in-memory storage
- **Styling**: Custom design system with gold/black/white palette
- **Typography**: Playfair Display (headings) + Montserrat (body)

## Key Features
- Elegant welcome screen with "View Catalog" call-to-action
- Beautiful project grid gallery with 10 interior design projects
- Category filtering (Living Room, Bedroom, Kitchen, Bathroom, Office, Commercial)
- Style filtering (Modern, Contemporary, Minimalist, Traditional, Industrial, Scandinavian)
- Real-time search functionality
- Project detail modal with image gallery
- Image lightbox with keyboard navigation
- Comprehensive sharing (WhatsApp, Email, Facebook, Pinterest, QR code)
- Dark/light mode toggle
- Smooth Framer Motion animations throughout
- Fully responsive design (mobile-first)

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.tsx   # Welcome/splash screen with View Catalog button
│   │   ├── CatalogView.tsx     # Main catalog with grid, filters, detail modal
│   │   ├── FilterSystem.tsx    # Category/style filters + search
│   │   ├── ImageLightbox.tsx   # Full-screen image viewer
│   │   ├── ShareModal.tsx      # Social sharing + QR code
│   │   └── ThemeToggle.tsx     # Dark/light mode toggle
│   ├── lib/
│   │   └── theme.tsx           # Theme context provider
│   └── App.tsx                 # Main app with welcome/catalog state
server/
├── routes.ts                   # API endpoints
└── storage.ts                  # In-memory project data
shared/
└── schema.ts                   # TypeScript types + Zod schemas
```

## User Flow
1. User lands on welcome screen with Diffrient Interiors branding
2. Click "View Catalog" to transition to catalog view
3. Browse projects, use filters/search to find specific designs
4. Click a project to view details in a modal
5. Open lightbox for full-screen image viewing
6. Share projects via social media, email, or QR code
7. Toggle dark/light mode at any time

## API Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project by ID

## Design System
- **Primary Color**: Gold (#D4A574 / HSL 43 74% 49%)
- **Background**: White (light) / Near-black (dark)
- **Border Radius**: Small (rounded-md)
- **Animations**: 300ms ease transitions, Framer Motion for complex animations

## Running the Project
```bash
npm run dev
```
Server runs on port 5000.

## Recent Changes
- December 4, 2024: Major catalog redesign
  - Added beautiful interior background image to welcome screen with dark overlay
  - Redesigned catalog with section-based layout (jewelry catalog style):
    - Category icons at top (Living Room, Bedroom, Kitchen, etc.)
    - "New Arrivals" horizontal scroll section
    - "Trending Collection" horizontal scroll section
    - "Exclusive Collection" horizontal scroll section
  - Added collection tags to schema (new, trending, exclusive)
  - Implemented "View All" functionality for each collection
  - Removed old filter-based grid layout
  
- December 4, 2024: Initial catalog transformation
  - Created WelcomeScreen component with branded splash
  - Created CatalogView component with integrated project detail modal
  - Removed multi-page website structure (Navigation, Footer, separate pages)
  - Rebranded from "Luxe Interiors" to "Diffrient Interiors"
  - Simplified to welcome screen + catalog view experience
