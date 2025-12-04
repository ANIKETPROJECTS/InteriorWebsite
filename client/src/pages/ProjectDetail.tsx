import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Ruler, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ImageLightbox } from "@/components/ImageLightbox";
import { ShareModal } from "@/components/ShareModal";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";
import { categoryLabels, styleLabels, type Project } from "@shared/schema";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", params.id],
  });

  const { data: allProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const relatedProjects = allProjects
    ?.filter(
      (p) =>
        p.id !== params.id &&
        (p.category === project?.category || p.style === project?.style)
    )
    .slice(0, 3);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 md:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-6 w-32 bg-muted rounded" />
              <div className="h-12 w-2/3 bg-muted rounded" />
              <div className="aspect-video bg-muted rounded-lg" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 md:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="font-serif text-3xl font-semibold mb-4">
              Project Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 md:pt-24">
        <article className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/projects">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-6 -ml-2 text-muted-foreground"
                  data-testid="button-back-to-projects"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="secondary">
                      {categoryLabels[project.category]}
                    </Badge>
                    <Badge variant="outline">{styleLabels[project.style]}</Badge>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold">
                    {project.title}
                  </h1>
                </div>
                <ShareModal
                  url={`/projects/${project.id}`}
                  title={project.title}
                  description={project.description}
                  image={project.images[0]}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div
                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
                data-testid="image-main"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Click to view gallery
                  </span>
                </div>
              </div>

              {project.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
                  {project.images.slice(1, 7).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(index + 1)}
                      data-testid={`image-thumbnail-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      {index === 5 && project.images.length > 7 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-medium">
                            +{project.images.length - 7}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid lg:grid-cols-3 gap-8 lg:gap-12 mt-12"
            >
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-4">
                    About This Project
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4">
                    Design Approach
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This {styleLabels[project.style].toLowerCase()} {categoryLabels[project.category].toLowerCase()} 
                    design focuses on creating a harmonious balance between aesthetics and functionality. 
                    Our team carefully selected materials, colors, and furnishings that complement the 
                    architectural elements while reflecting the client's personal style and preferences.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-6 space-y-6 sticky top-24">
                  <h3 className="font-serif text-lg font-semibold border-b border-border pb-4">
                    Project Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground block">Location</span>
                        <span className="font-medium">{project.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Ruler className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground block">Area</span>
                        <span className="font-medium">{project.area}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-muted-foreground block">Completed</span>
                        <span className="font-medium">{project.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link href="/contact">
                      <Button className="w-full bg-gold hover:bg-gold-dark text-primary-foreground" data-testid="button-inquire">
                        Inquire About This Style
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </article>

        {relatedProjects && relatedProjects.length > 0 && (
          <section className="py-12 lg:py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Related Projects
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Explore more {styleLabels[project.style].toLowerCase()} and {categoryLabels[project.category].toLowerCase()} designs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedProjects.map((relatedProject, index) => (
                  <ProjectCard
                    key={relatedProject.id}
                    project={relatedProject}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <ImageLightbox
        images={project.images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        projectTitle={project.title}
      />
    </div>
  );
}
