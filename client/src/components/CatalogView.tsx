import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Maximize2, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSystem } from "./FilterSystem";
import { ImageLightbox } from "./ImageLightbox";
import { ShareModal } from "./ShareModal";
import { ThemeToggle } from "./ThemeToggle";
import type { Project, ProjectCategory, ProjectStyle } from "@shared/schema";
import { categoryLabels, styleLabels } from "@shared/schema";

interface CatalogViewProps {
  onBack: () => void;
}

function CatalogProjectCard({ 
  project, 
  index,
  onClick 
}: { 
  project: Project; 
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
        onClick={onClick}
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
    </motion.div>
  );
}

function CatalogProjectCardSkeleton() {
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

function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto"
          data-testid="modal-project-detail"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-50 w-full max-w-4xl mx-4 my-8 bg-background rounded-lg overflow-hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
              data-testid="button-close-detail"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="relative aspect-[16/9] bg-muted">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCurrentImageIndex(0);
                  setLightboxOpen(true);
                }}
                className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
                data-testid="button-open-lightbox"
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>

            {project.images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setLightboxOpen(true);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      index === 0 ? "border-gold" : "border-transparent hover:border-gold/50"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">
                      {categoryLabels[project.category]}
                    </Badge>
                    <Badge variant="outline">
                      {styleLabels[project.style]}
                    </Badge>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                    {project.title}
                  </h2>
                </div>
                <ShareModal
                  url={`/projects/${project.id}`}
                  title={project.title}
                  description={project.description}
                  image={project.images[0]}
                />
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Maximize2 className="h-4 w-4 text-gold" />
                  <span>{project.area}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-gold" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>

            <ImageLightbox
              images={project.images}
              currentIndex={currentImageIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              onNavigate={setCurrentImageIndex}
              projectTitle={project.title}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CatalogView({ onBack }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProjectCategory[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<ProjectStyle[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(project.category);

      const matchesStyle =
        selectedStyles.length === 0 || selectedStyles.includes(project.style);

      return matchesSearch && matchesCategory && matchesStyle;
    });
  }, [projects, searchQuery, selectedCategories, selectedStyles]);

  const handleCategoryToggle = (category: ProjectCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStyleToggle = (style: ProjectStyle) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStyles([]);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                data-testid="button-back-home"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-serif text-xl font-semibold">Diffrient Interiors</h1>
                <span className="text-xs text-muted-foreground">Portfolio Catalog</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="text-gold text-sm font-medium uppercase tracking-wider">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-3">
              Our Projects
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of interior design projects. 
              Use filters to find your style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <FilterSystem
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              selectedStyles={selectedStyles}
              onStyleToggle={handleStyleToggle}
              onClearFilters={handleClearFilters}
              resultCount={filteredProjects.length}
            />
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <CatalogProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <CatalogProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-muted-foreground">?</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button
                onClick={handleClearFilters}
                className="text-gold hover:text-gold-dark transition-colors"
                data-testid="button-clear-filters-empty"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
