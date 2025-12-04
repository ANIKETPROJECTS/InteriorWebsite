import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  MapPin, 
  Maximize2, 
  Calendar, 
  X, 
  ChevronRight,
  Sofa,
  Bed,
  ChefHat,
  Bath,
  Briefcase,
  Building2,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageLightbox } from "./ImageLightbox";
import { ShareModal } from "./ShareModal";
import { ThemeToggle } from "./ThemeToggle";
import type { Project, ProjectCategory, CollectionType } from "@shared/schema";
import { categoryLabels, styleLabels } from "@shared/schema";

interface CatalogViewProps {
  onBack: () => void;
}

const categoryIcons: Record<ProjectCategory, typeof Sofa> = {
  "living-room": Sofa,
  "bedroom": Bed,
  "kitchen": ChefHat,
  "bathroom": Bath,
  "office": Briefcase,
  "commercial": Building2,
};

const collectionLabels: Record<CollectionType, { title: string; highlight: string }> = {
  new: { title: "New", highlight: "Arrivals" },
  trending: { title: "Trending", highlight: "Collection" },
  exclusive: { title: "Exclusive", highlight: "Collection" },
};

function CategoryCard({ 
  category, 
  label, 
  isSelected,
  onClick 
}: { 
  category: ProjectCategory;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = categoryIcons[category];
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-4 rounded-md transition-colors min-w-[100px] ${
        isSelected 
          ? "bg-gold/10 border-2 border-gold" 
          : "bg-card border border-border hover:border-gold/50"
      }`}
      data-testid={`button-category-${category}`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        isSelected ? "bg-gold text-white" : "bg-muted"
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-sm font-medium text-center ${
        isSelected ? "text-gold" : "text-foreground"
      }`}>
        {label}
      </span>
    </motion.button>
  );
}

function CollectionCard({ 
  project,
  onClick 
}: { 
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex-shrink-0 w-[280px] sm:w-[300px] text-left group"
      data-testid={`card-project-${project.id}`}
    >
      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-muted">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {project.featured && (
          <Badge 
            className="absolute top-3 left-3 bg-gold text-white border-0"
          >
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {project.location} | {project.area}
        </p>
      </div>
    </motion.button>
  );
}

function CollectionSection({ 
  collection,
  projects,
  onProjectClick,
  onViewAll
}: { 
  collection: CollectionType;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onViewAll: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const labels = collectionLabels[collection];

  if (projects.length === 0) return null;

  return (
    <section className="py-8" data-testid={`section-${collection}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl">
            <span className="text-gold italic">{labels.title}</span>{" "}
            <span className="font-semibold">{labels.highlight}</span>
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            className="gap-1 flex-shrink-0"
            data-testid={`button-view-all-${collection}`}
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <CollectionCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </section>
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

function FullCollectionView({
  collection,
  projects,
  onBack,
  onProjectClick,
}: {
  collection: CollectionType;
  projects: Project[];
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}) {
  const labels = collectionLabels[collection];

  return (
    <div className="py-8" data-testid={`view-all-${collection}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back-collection"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="font-serif text-2xl sm:text-3xl">
            <span className="text-gold italic">{labels.title}</span>{" "}
            <span className="font-semibold">{labels.highlight}</span>
          </h2>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <CollectionCard
                  project={project}
                  onClick={() => onProjectClick(project)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function CatalogView({ onBack }: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewingCollection, setViewingCollection] = useState<CollectionType | null>(null);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const categories = Object.entries(categoryLabels) as [ProjectCategory, string][];

  const getProjectsByCollection = (collection: CollectionType) => {
    if (!projects) return [];
    let filtered = projects.filter(p => p.collection === collection);
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    return filtered;
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  const handleCategoryClick = (category: ProjectCategory) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  const handleViewAll = (collection: CollectionType) => {
    setViewingCollection(collection);
  };

  const handleBackFromCollection = () => {
    setViewingCollection(null);
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
            </div>
            <h1 className="font-serif text-xl sm:text-2xl">
              <span className="text-gold italic">Diffrient</span>{" "}
              <span className="font-semibold">Catalog</span>
            </h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" data-testid="button-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 py-2">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <motion.div
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 text-sm text-gold whitespace-nowrap"
          >
            <span>Premium Interior Designs</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Exclusive Collections</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Expert Craftsmanship</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Premium Interior Designs</span>
          </motion.div>
        </div>
      </div>

      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(([category, label]) => (
              <CategoryCard
                key={category}
                category={category}
                label={label}
                isSelected={selectedCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
      </section>

      <main>
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading collections...</p>
          </div>
        ) : viewingCollection ? (
          <FullCollectionView
            collection={viewingCollection}
            projects={getProjectsByCollection(viewingCollection)}
            onBack={handleBackFromCollection}
            onProjectClick={handleProjectClick}
          />
        ) : (
          <>
            <CollectionSection
              collection="new"
              projects={getProjectsByCollection("new")}
              onProjectClick={handleProjectClick}
              onViewAll={() => handleViewAll("new")}
            />
            
            <div className="border-t border-border" />
            
            <CollectionSection
              collection="trending"
              projects={getProjectsByCollection("trending")}
              onProjectClick={handleProjectClick}
              onViewAll={() => handleViewAll("trending")}
            />
            
            <div className="border-t border-border" />
            
            <CollectionSection
              collection="exclusive"
              projects={getProjectsByCollection("exclusive")}
              onProjectClick={handleProjectClick}
              onViewAll={() => handleViewAll("exclusive")}
            />
          </>
        )}
      </main>

      <footer className="py-8 border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Diffrient Interiors - Crafting exceptional spaces
          </p>
        </div>
      </footer>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
