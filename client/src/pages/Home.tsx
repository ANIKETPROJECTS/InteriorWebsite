import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";
import type { Project } from "@shared/schema";

export default function Home() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProjects = projects?.filter((p) => p.featured).slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />

        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                Our Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
                Featured Projects
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collection of exceptional interior designs that 
                showcase our commitment to elegance, functionality, and timeless beauty.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link href="/projects">
                <Button variant="outline" size="lg" data-testid="button-view-all-projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-gold text-sm font-medium uppercase tracking-wider">
                  About Us
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-4">
                  Crafting Exceptional Spaces Since 2010
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  At Luxe Interiors, we believe that great design has the power to transform 
                  not just spaces, but the way people live, work, and experience their 
                  environments. Our team of award-winning designers brings together decades 
                  of expertise in residential and commercial interior design.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  From concept to completion, we work closely with our clients to create 
                  bespoke interiors that reflect their unique personality and lifestyle 
                  while maintaining the highest standards of craftsmanship and attention to detail.
                </p>
                <Link href="/about">
                  <Button className="mt-8 bg-gold hover:bg-gold-dark text-primary-foreground" data-testid="button-learn-more">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">250+</span>
                    <span className="text-sm text-muted-foreground mt-1 block">Projects Completed</span>
                  </div>
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">15</span>
                    <span className="text-sm text-muted-foreground mt-1 block">Design Awards</span>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">14</span>
                    <span className="text-sm text-muted-foreground mt-1 block">Years Experience</span>
                  </div>
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">98%</span>
                    <span className="text-sm text-muted-foreground mt-1 block">Client Satisfaction</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                Get Started
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
                Ready to Transform Your Space?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Let's discuss your vision and create something extraordinary together. 
                Schedule a consultation with our design team today.
              </p>
              <Link href="/contact">
                <Button size="lg" className="mt-8 bg-gold hover:bg-gold-dark text-primary-foreground" data-testid="button-schedule-consultation">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
