import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import interiorBg from "@assets/stock_images/luxury_modern_interi_fa9835d5.jpg";

interface WelcomeScreenProps {
  onEnterCatalog: () => void;
}

export function WelcomeScreen({ onEnterCatalog }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${interiorBg})` }}
        data-testid="background-interior-image"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-0.5 bg-gold mx-auto mb-8" data-testid="decoration-gold-line" />
            <span className="text-gold text-sm font-medium uppercase tracking-[0.3em]" data-testid="text-portfolio-label">
              Interior Design Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
            data-testid="heading-brand-name"
          >
            <span className="block text-white" data-testid="text-brand-diffrient">Diffrient</span>
            <span className="block text-gold" data-testid="text-brand-interiors">Interiors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-white/80 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
            data-testid="text-tagline"
          >
            Crafting exceptional spaces that inspire, transform, and elevate everyday living
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <Button
              size="lg"
              onClick={onEnterCatalog}
              className="bg-gold hover:bg-gold-dark text-primary-foreground px-8 py-6 text-lg gap-2 group"
              data-testid="button-view-catalog"
            >
              View Catalog
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16"
          >
            <div className="w-12 h-0.5 bg-white/30 mx-auto" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70 text-sm"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wider" data-testid="text-scroll-indicator">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-gold rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
