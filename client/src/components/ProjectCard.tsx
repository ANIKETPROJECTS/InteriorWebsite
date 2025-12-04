import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { categoryLabels, styleLabels, type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="group cursor-pointer"
          data-testid={`card-project-${project.id}`}
        >
          <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-muted">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-white/90 text-sm font-medium">View Project</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {categoryLabels[project.category]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {styleLabels[project.style]}
              </Badge>
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{project.location}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{project.year}</span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-md bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
        </div>
        <div className="h-6 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}
