import { type Project } from "@shared/schema";

export const projects: Project[] = [
  {
    id: "1",
    title: "Manhattan Penthouse Living",
    description: "A stunning modern living room in a Manhattan penthouse featuring floor-to-ceiling windows with breathtaking city views. The space showcases a harmonious blend of contemporary furniture, warm textures, and gold accents that create an atmosphere of understated luxury.",
    category: "living-room",
    style: "modern",
    images: [
      "/images/modern_luxury_living_room.png",
      "/images/contemporary_master_bedroom.png",
      "/images/minimalist_white_kitchen.png",
    ],
    location: "New York, NY",
    area: "2,400 sq ft",
    year: "2024",
    featured: true,
    collection: "new",
  },
  {
    id: "2",
    title: "Heritage Estate Drawing Room",
    description: "An elegant traditional living room that pays homage to classic European design. Rich wood paneling, a stunning marble fireplace, and carefully selected antiques create a space that feels both timeless and inviting.",
    category: "living-room",
    style: "traditional",
    images: [
      "/images/traditional_elegant_living_room.png",
      "/images/modern_spa_bathroom.png",
    ],
    location: "Greenwich, CT",
    area: "1,800 sq ft",
    year: "2023",
    featured: true,
    collection: "exclusive",
  },
  {
    id: "3",
    title: "Scandinavian Sanctuary",
    description: "A serene bedroom retreat inspired by Nordic design principles. Natural light floods the space through sheer curtains, illuminating the warm oak furniture and soft linen bedding.",
    category: "bedroom",
    style: "scandinavian",
    images: [
      "/images/scandinavian_cozy_bedroom.png",
      "/images/minimalist_white_kitchen.png",
    ],
    location: "Portland, OR",
    area: "450 sq ft",
    year: "2024",
    featured: true,
    collection: "trending",
  },
  {
    id: "4",
    title: "Contemporary Master Suite",
    description: "A sophisticated master bedroom that embodies contemporary elegance. The neutral palette of greys and taupes is punctuated by statement lighting and textural elements.",
    category: "bedroom",
    style: "contemporary",
    images: [
      "/images/contemporary_master_bedroom.png",
      "/images/modern_spa_bathroom.png",
      "/images/scandinavian_cozy_bedroom.png",
    ],
    location: "Los Angeles, CA",
    area: "600 sq ft",
    year: "2023",
    featured: true,
    collection: "new",
  },
  {
    id: "5",
    title: "Minimalist Chef's Kitchen",
    description: "A pristine white kitchen that exemplifies minimalist design at its finest. Handleless cabinetry creates clean lines throughout, while a dramatic waterfall marble island serves as the centerpiece.",
    category: "kitchen",
    style: "minimalist",
    images: [
      "/images/minimalist_white_kitchen.png",
      "/images/contemporary_grey_bathroom.png",
      "/images/scandinavian_cozy_bedroom.png",
    ],
    location: "San Francisco, CA",
    area: "350 sq ft",
    year: "2024",
    featured: true,
    collection: "trending",
  },
  {
    id: "6",
    title: "Industrial Loft Kitchen",
    description: "A bold industrial kitchen set within a converted warehouse space. Exposed brick walls and steel-framed windows provide an authentic backdrop for the custom concrete countertops.",
    category: "kitchen",
    style: "industrial",
    images: [
      "/images/industrial_loft_kitchen.png",
      "/images/modern_executive_office.png",
      "/images/contemporary_grey_bathroom.png",
    ],
    location: "Brooklyn, NY",
    area: "400 sq ft",
    year: "2023",
    featured: false,
    collection: "exclusive",
  },
  {
    id: "7",
    title: "Spa-Inspired Bathroom Retreat",
    description: "A luxurious bathroom that transforms daily rituals into spa-like experiences. The freestanding soaking tub takes center stage against floor-to-ceiling marble walls.",
    category: "bathroom",
    style: "modern",
    images: [
      "/images/modern_spa_bathroom.png",
      "/images/minimalist_white_kitchen.png",
      "/images/contemporary_master_bedroom.png",
    ],
    location: "Miami, FL",
    area: "200 sq ft",
    year: "2024",
    featured: true,
    collection: "new",
  },
  {
    id: "8",
    title: "Contemporary Urban Bathroom",
    description: "A sleek contemporary bathroom featuring large-format tiles and frameless glass elements. The double vanity with backlit mirror provides ample space and soft ambient lighting.",
    category: "bathroom",
    style: "contemporary",
    images: [
      "/images/contemporary_grey_bathroom.png",
      "/images/modern_spa_bathroom.png",
    ],
    location: "Chicago, IL",
    area: "180 sq ft",
    year: "2023",
    featured: false,
    collection: "trending",
  },
  {
    id: "9",
    title: "Executive Home Office",
    description: "A distinguished home office designed for the modern professional. Rich walnut wood furniture and built-in bookshelves create an atmosphere of authority and focus.",
    category: "office",
    style: "modern",
    images: [
      "/images/modern_executive_office.png",
      "/images/modern_luxury_living_room.png",
      "/images/industrial_loft_kitchen.png",
    ],
    location: "Boston, MA",
    area: "280 sq ft",
    year: "2024",
    featured: true,
    collection: "exclusive",
  },
  {
    id: "10",
    title: "Boutique Hotel Lobby",
    description: "A dramatic commercial space that sets the tone for a luxury boutique hotel. Soaring ceilings showcase a sculptural lighting installation, while curved seating areas invite guests to linger.",
    category: "commercial",
    style: "contemporary",
    images: [
      "/images/boutique_hotel_lobby.png",
      "/images/modern_luxury_living_room.png",
      "/images/contemporary_master_bedroom.png",
    ],
    location: "Austin, TX",
    area: "3,500 sq ft",
    year: "2024",
    featured: true,
    collection: "trending",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}

export function getProjectsByCollection(collection: string): Project[] {
  return projects.filter(p => p.collection === collection);
}
