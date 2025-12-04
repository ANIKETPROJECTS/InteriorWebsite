import { type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProjectsByStyle(style: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

const projectData: Project[] = [
  {
    id: "1",
    title: "Manhattan Penthouse Living",
    description: "A stunning modern living room in a Manhattan penthouse featuring floor-to-ceiling windows with breathtaking city views. The space showcases a harmonious blend of contemporary furniture, warm textures, and gold accents that create an atmosphere of understated luxury. Custom millwork and carefully curated art pieces complete this sophisticated urban retreat.",
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
  },
  {
    id: "2",
    title: "Heritage Estate Drawing Room",
    description: "An elegant traditional living room that pays homage to classic European design. Rich wood paneling, a stunning marble fireplace, and carefully selected antiques create a space that feels both timeless and inviting. The emerald velvet furnishings add a touch of modern color to this sophisticated setting.",
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
  },
  {
    id: "3",
    title: "Scandinavian Sanctuary",
    description: "A serene bedroom retreat inspired by Nordic design principles. Natural light floods the space through sheer curtains, illuminating the warm oak furniture and soft linen bedding. Every element has been carefully chosen to promote rest and relaxation while maintaining a connection to nature.",
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
  },
  {
    id: "4",
    title: "Contemporary Master Suite",
    description: "A sophisticated master bedroom that embodies contemporary elegance. The neutral palette of greys and taupes is punctuated by statement lighting and textural elements. The upholstered headboard serves as a focal point, while plush textiles create an inviting atmosphere perfect for unwinding.",
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
  },
  {
    id: "5",
    title: "Minimalist Chef's Kitchen",
    description: "A pristine white kitchen that exemplifies minimalist design at its finest. Handleless cabinetry creates clean lines throughout, while a dramatic waterfall marble island serves as the centerpiece. Integrated appliances and open shelving maintain the uncluttered aesthetic that defines this space.",
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
  },
  {
    id: "6",
    title: "Industrial Loft Kitchen",
    description: "A bold industrial kitchen set within a converted warehouse space. Exposed brick walls and steel-framed windows provide an authentic backdrop for the custom concrete countertops and copper pipe shelving. Vintage-inspired pendant lights add warmth to the urban aesthetic.",
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
  },
  {
    id: "7",
    title: "Spa-Inspired Bathroom Retreat",
    description: "A luxurious bathroom that transforms daily rituals into spa-like experiences. The freestanding soaking tub takes center stage against floor-to-ceiling marble walls. Thoughtful lighting design and premium fixtures create an atmosphere of pure indulgence and relaxation.",
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
  },
  {
    id: "8",
    title: "Contemporary Urban Bathroom",
    description: "A sleek contemporary bathroom featuring large-format tiles and frameless glass elements. The double vanity with backlit mirror provides ample space and soft ambient lighting. Brass fixtures add a touch of warmth to the predominantly grey palette.",
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
  },
  {
    id: "9",
    title: "Executive Home Office",
    description: "A distinguished home office designed for the modern professional. Rich walnut wood furniture and built-in bookshelves create an atmosphere of authority and focus. Large windows provide natural light and inspiring city views, while carefully selected art and accessories add personal touches.",
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
  },
  {
    id: "10",
    title: "Boutique Hotel Lobby",
    description: "A dramatic commercial space that sets the tone for a luxury boutique hotel. Soaring ceilings showcase a sculptural lighting installation, while curved seating areas invite guests to linger. The marble flooring and carefully curated indoor plants create an atmosphere of refined elegance.",
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
  },
];

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;

  constructor() {
    this.projects = new Map();
    projectData.forEach((project) => {
      this.projects.set(project.id, project);
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }

  async getProjectsByStyle(style: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.style === style
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
