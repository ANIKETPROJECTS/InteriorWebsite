# Design Guidelines: Dynamic Digital Interior Design Catalogue

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium portfolio sites like Behance, Awwwards, and luxury architecture portfolios. Think high-end design studio aesthetic that impresses immediately.

## Visual Aesthetic & Color Palettes

Choose one sophisticated palette:
- **Option 1**: Black, white, gold accents
- **Option 2**: Warm neutrals (cream, taupe, charcoal)
- **Option 3**: Modern (deep navy, white, copper accents)

Include **Dark/Light mode toggle** for user preference.

## Typography

- **Display/Headings**: Playfair Display or Cormorant (elegant, sophisticated serif)
- **Body/UI**: Montserrat (clean, modern sans-serif)
- **Hierarchy**: Large hero headlines, clear section titles, readable body text with generous line-height

## Layout System

**Spacing**: Tailwind units of 4, 8, 12, 16, 24, 32 for consistent rhythm
- Generous white space and breathing room throughout
- Large, immersive layouts with focus on imagery

**Grid System**:
- Mobile (320px+): 1 column, full-width cards
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3-4 columns for project gallery
- Max-width containers: 1400px for content

## Component Library

### Navigation
- Sticky/floating navigation bar with blur effect
- Hamburger menu for mobile with smooth slide-in animation
- Clean, minimal desktop nav with elegant hover states

### Hero Section
Large, immersive hero image (full viewport height, 100vh) with:
- Captivating interior design visual
- Elegant headline and subheadline overlay
- CTA button with blurred background (no hover interactions on blur)
- Subtle parallax scrolling effect

### Project Cards
- Large, high-quality images with aspect ratio 4:3 or 16:9
- Elegant hover effects: subtle zoom (1.05x scale), overlay fade
- Card shadows for depth (subtle elevation)
- Category and style tags as chips
- Smooth transitions (300ms ease)

### Image Gallery/Lightbox
- Full-screen modal viewer with dark backdrop
- Image navigation arrows and keyboard support
- Smooth fade/slide transitions between images
- Close button (X) top-right corner
- Touch-friendly swipe gestures for mobile

### Filter System
- Filter chips/buttons with active states (filled vs outline)
- Category filters: Living Room, Bedroom, Kitchen, Bathroom, Office, Commercial
- Style filters: Modern, Contemporary, Minimalist, Traditional, Industrial, Scandinavian
- Search bar with icon, real-time filtering
- Clear/reset filters option

### Sharing Components
- Share buttons: WhatsApp, Email, Facebook, Pinterest, Instagram
- Copy Link button with visual confirmation (checkmark animation)
- QR code generation modal for mobile sharing
- Elegant icon buttons with subtle hover lift

### Additional UI Elements
- Loading animations/skeleton screens (shimmer effect)
- Smooth page transitions (fade between routes)
- Footer with company info, social links, elegant layout
- Toast notifications for actions (link copied, etc.)

## Animations & Interactions

**Motion Philosophy**: Buttery smooth, 60fps performance, no jarring movements

- **Hover Effects**: Subtle zoom on images, fade overlays, lift on cards
- **Page Transitions**: Smooth fade or slide (200-300ms)
- **Scroll Animations**: Subtle parallax on hero, fade-in on scroll for project cards
- **Micro-interactions**: Button presses, filter toggles, icon animations
- **Loading States**: Elegant skeleton screens with shimmer animation
- Use Framer Motion for complex animations, CSS for simple transitions

## Responsive Breakpoints

- **Mobile**: 320px - 767px (touch-optimized, swipe gestures)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1441px+

Touch-friendly: Larger tap targets (min 44px), swipe galleries, smooth scrolling

## Page Structure

1. **Home/Landing**: Hero + Featured projects grid (6-8 projects)
2. **All Projects**: Complete gallery with filters + search
3. **Project Detail**: Hero image, gallery carousel, description, specifications, related projects
4. **About**: Company story with elegant layout
5. **Contact**: Contact information display

## Images

**Hero Section**: Large, captivating interior design image (living room, modern luxury space)

**Project Gallery**: 8-12 dummy projects with high-quality placeholder images across categories:
- 2x Living Room (Modern, Traditional)
- 2x Bedroom (Contemporary, Scandinavian)  
- 2x Kitchen (Minimalist, Industrial)
- 2x Bathroom (Modern, Contemporary)
- 1x Office (Modern)
- 1x Commercial (Contemporary)

Use placeholder services like Unsplash for high-quality interior design images.

## Key Principles

- **Visual Impact First**: Stunning, immediately impressive
- **Smooth Performance**: Fast loading, lazy-loaded images, optimized animations
- **Intuitive Navigation**: Easy filtering, clear hierarchy
- **Mobile Excellence**: Perfect touch experience, responsive images
- **Premium Feel**: Sophisticated, luxurious, artistic presentation