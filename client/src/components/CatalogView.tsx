import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Maximize2, 
  Calendar, 
  X, 
  ChevronRight,
  Menu,
  Heart,
  ChevronDown,
  Grid3X3,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageLightbox } from "./ImageLightbox";
import { ShareModal } from "./ShareModal";
import { ThemeToggle } from "./ThemeToggle";
import type { Project, ProjectCategory, CollectionType } from "@shared/schema";
import { categoryLabels, styleLabels } from "@shared/schema";
import { projects as staticProjects } from "@/data/projects";

import livingRoomImg from "@assets/generated_images/luxury_living_room_interior.png";
import bedroomImg from "@assets/generated_images/luxury_bedroom_interior.png";
import kitchenImg from "@assets/generated_images/luxury_kitchen_interior.png";
import bathroomImg from "@assets/generated_images/luxury_bathroom_interior.png";
import officeImg from "@assets/generated_images/luxury_office_interior.png";
import commercialImg from "@assets/generated_images/luxury_commercial_interior.png";

interface CatalogViewProps {
  onBack: () => void;
}

const categoryImages: Record<ProjectCategory, string> = {
  "living-room": livingRoomImg,
  "bedroom": bedroomImg,
  "kitchen": kitchenImg,
  "bathroom": bathroomImg,
  "office": officeImg,
  "commercial": commercialImg,
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
  const image = categoryImages[category];
  
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-3 rounded-md transition-all min-w-[120px] ${
        isSelected 
          ? "ring-2 ring-gold ring-offset-2 ring-offset-background" 
          : "hover:ring-1 hover:ring-gold/50"
      }`}
      data-testid={`button-category-${category}`}
    >
      <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-colors ${
        isSelected ? "border-gold" : "border-border"
      }`}>
        <img 
          src={image} 
          alt={label}
          className="w-full h-full object-cover"
        />
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

function MyntraProductCard({ 
  project,
  onClick 
}: { 
  project: Project;
  onClick: () => void;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative bg-card rounded-md overflow-hidden border border-border"
      data-testid={`product-card-${project.id}`}
    >
      <button
        onClick={onClick}
        className="w-full text-left"
        data-testid={`button-product-${project.id}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {project.featured && (
            <Badge 
              className="absolute top-3 left-3 bg-gold text-white border-0 text-xs"
            >
              Featured
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full h-9 w-9 ${
              isWishlisted ? "text-red-500" : "text-muted-foreground"
            }`}
            data-testid={`button-wishlist-${project.id}`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-gold transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                {categoryLabels[project.category]}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-gold flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          
          <div className="flex items-center justify-between gap-2 pt-1">
            <Badge variant="outline" className="text-xs">
              {styleLabels[project.style]}
            </Badge>
            <span className="text-xs text-muted-foreground">{project.area}</span>
          </div>
        </div>
      </button>
    </motion.div>
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
  const [sortBy, setSortBy] = useState<string>("newest");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return parseInt(b.year) - parseInt(a.year);
      case "oldest":
        return parseInt(a.year) - parseInt(b.year);
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background" data-testid={`view-all-${collection}`}>
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                data-testid="button-back-collection"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="font-serif text-lg sm:text-xl">
                  <span className="text-gold italic">{labels.title}</span>{" "}
                  <span className="font-semibold">{labels.highlight}</span>
                </h2>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {projects.length} {projects.length === 1 ? "design" : "designs"} found
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant={gridCols === 2 ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setGridCols(2)}
                  data-testid="button-grid-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={gridCols === 3 ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setGridCols(3)}
                  data-testid="button-grid-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-background border border-border rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
                  data-testid="select-sort"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-sm text-muted-foreground mb-4 text-center sm:text-left sm:hidden">
          {projects.length} {projects.length === 1 ? "design" : "designs"} found
        </div>

        {sortedProjects.length > 0 ? (
          <div className={`grid gap-4 sm:gap-6 ${
            gridCols === 2 
              ? "grid-cols-2 lg:grid-cols-2" 
              : gridCols === 3 
                ? "grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-2 lg:grid-cols-4"
          }`}>
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
              >
                <MyntraProductCard
                  project={project}
                  onClick={() => onProjectClick(project)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">No designs found</p>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
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

  const projects = staticProjects;

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
            className="flex justify-center gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
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
        {viewingCollection ? (
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
