import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  type ProjectCategory,
  type ProjectStyle,
  categoryLabels,
  styleLabels,
} from "@shared/schema";
import { cn } from "@/lib/utils";

interface FilterSystemProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: ProjectCategory[];
  onCategoryToggle: (category: ProjectCategory) => void;
  selectedStyles: ProjectStyle[];
  onStyleToggle: (style: ProjectStyle) => void;
  onClearFilters: () => void;
  resultCount: number;
}

const categories: ProjectCategory[] = [
  "living-room",
  "bedroom",
  "kitchen",
  "bathroom",
  "office",
  "commercial",
];

const styles: ProjectStyle[] = [
  "modern",
  "contemporary",
  "minimalist",
  "traditional",
  "industrial",
  "scandinavian",
];

export function FilterSystem({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  selectedStyles,
  onStyleToggle,
  onClearFilters,
  resultCount,
}: FilterSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedStyles.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryToggle(category)}
              className={cn(
                "transition-all",
                selectedCategories.includes(category) && "bg-gold hover:bg-gold-dark text-primary-foreground"
              )}
              data-testid={`filter-category-${category}`}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">
          Styles
        </h4>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <Button
              key={style}
              variant={selectedStyles.includes(style) ? "default" : "outline"}
              size="sm"
              onClick={() => onStyleToggle(style)}
              className={cn(
                "transition-all",
                selectedStyles.includes(style) && "bg-gold hover:bg-gold-dark text-primary-foreground"
              )}
              data-testid={`filter-style-${style}`}
            >
              {styleLabels[style]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden gap-2" data-testid="button-filters-mobile">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  {selectedCategories.length + selectedStyles.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle className="font-serif">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <FilterContent />
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">
              {resultCount} {resultCount === 1 ? "project" : "projects"} found
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => onCategoryToggle(category)}
                  data-testid={`badge-category-${category}`}
                >
                  {categoryLabels[category]}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {selectedStyles.map((style) => (
                <Badge
                  key={style}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => onStyleToggle(style)}
                  data-testid={`badge-style-${style}`}
                >
                  {styleLabels[style]}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground"
              data-testid="button-clear-filters"
            >
              Clear all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
