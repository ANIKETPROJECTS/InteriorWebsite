import { z } from "zod";

export const projectCategoryEnum = z.enum([
  "living-room",
  "bedroom",
  "kitchen",
  "bathroom",
  "office",
  "commercial"
]);

export const projectStyleEnum = z.enum([
  "modern",
  "contemporary",
  "minimalist",
  "traditional",
  "industrial",
  "scandinavian"
]);

export type ProjectCategory = z.infer<typeof projectCategoryEnum>;
export type ProjectStyle = z.infer<typeof projectStyleEnum>;

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: projectCategoryEnum,
  style: projectStyleEnum,
  images: z.array(z.string()),
  location: z.string(),
  area: z.string(),
  year: z.string(),
  featured: z.boolean().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const insertProjectSchema = projectSchema.omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;

export const categoryLabels: Record<ProjectCategory, string> = {
  "living-room": "Living Room",
  "bedroom": "Bedroom",
  "kitchen": "Kitchen",
  "bathroom": "Bathroom",
  "office": "Office",
  "commercial": "Commercial",
};

export const styleLabels: Record<ProjectStyle, string> = {
  "modern": "Modern",
  "contemporary": "Contemporary",
  "minimalist": "Minimalist",
  "traditional": "Traditional",
  "industrial": "Industrial",
  "scandinavian": "Scandinavian",
};
