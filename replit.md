# Luxe Interiors - Digital Interior Design Portfolio

## Overview
A stunning, modern digital catalogue for an interior design company featuring a beautiful portfolio showcase with advanced filtering, smooth animations, and comprehensive sharing capabilities.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js with in-memory storage
- **Styling**: Custom design system with gold/black/white palette
- **Typography**: Playfair Display (headings) + Montserrat (body)

## Key Features
- Beautiful masonry grid gallery with 10 interior design projects
- Category filtering (Living Room, Bedroom, Kitchen, Bathroom, Office, Commercial)
- Style filtering (Modern, Contemporary, Minimalist, Traditional, Industrial, Scandinavian)
- Real-time search functionality
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
│   │   ├── Navigation.tsx      # Sticky header with mobile menu
│   │   ├── Hero.tsx            # Homepage hero with parallax
│   │   ├── ProjectCard.tsx     # Project card with hover effects
│   │   ├── FilterSystem.tsx    # Category/style filters + search
│   │   ├── ImageLightbox.tsx   # Full-screen image viewer
│   │   ├── ShareModal.tsx      # Social sharing + QR code
│   │   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   │   └── Footer.tsx          # Site footer
│   ├── pages/
│   │   ├── Home.tsx            # Landing with hero + featured
│   │   ├── Projects.tsx        # All projects with filters
│   │   ├── ProjectDetail.tsx   # Individual project view
│   │   ├── About.tsx           # Company story + team
│   │   └── Contact.tsx         # Contact information
│   └── lib/
│       └── theme.tsx           # Theme context provider
server/
├── routes.ts                   # API endpoints
└── storage.ts                  # In-memory project data
shared/
└── schema.ts                   # TypeScript types + Zod schemas
```

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
- December 4, 2024: Initial implementation of complete portfolio system
  - Created all frontend components with Framer Motion animations
  - Implemented responsive design with mobile hamburger menu
  - Added dark/light theme toggle
  - Created 10 sample interior design projects
  - Implemented filtering and search functionality
  - Added share modal with social media and QR code support
