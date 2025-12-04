import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiPinterest, SiLinkedin } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="font-serif text-2xl font-semibold tracking-tight cursor-pointer">
                <span className="text-gold">Luxe</span>
                <span className="text-foreground"> Interiors</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Creating exceptional interior spaces that inspire, comfort, and elevate everyday living.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                data-testid="link-social-facebook"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                data-testid="link-social-instagram"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                data-testid="link-social-pinterest"
                aria-label="Pinterest"
              >
                <SiPinterest className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                data-testid="link-social-linkedin"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <span className="text-muted-foreground hover:text-gold transition-colors cursor-pointer text-sm" data-testid="link-footer-home">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span className="text-muted-foreground hover:text-gold transition-colors cursor-pointer text-sm" data-testid="link-footer-projects">
                    Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-gold transition-colors cursor-pointer text-sm" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-gold transition-colors cursor-pointer text-sm" data-testid="link-footer-contact">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">Residential Design</li>
              <li className="text-muted-foreground text-sm">Commercial Spaces</li>
              <li className="text-muted-foreground text-sm">Renovation & Remodeling</li>
              <li className="text-muted-foreground text-sm">Design Consultation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Design Avenue, Suite 500<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-muted-foreground text-sm">hello@luxeinteriors.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {currentYear} Luxe Interiors. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
