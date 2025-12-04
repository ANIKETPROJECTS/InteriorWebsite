import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiFacebook, SiInstagram, SiPinterest, SiLinkedin } from "react-icons/si";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Studio",
    details: ["123 Design Avenue, Suite 500", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@luxeinteriors.com", "projects@luxeinteriors.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: By appointment"],
  },
];

const socialLinks = [
  { name: "Facebook", icon: SiFacebook, url: "#" },
  { name: "Instagram", icon: SiInstagram, url: "#" },
  { name: "Pinterest", icon: SiPinterest, url: "#" },
  { name: "LinkedIn", icon: SiLinkedin, url: "#" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 md:pt-24">
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                Contact Us
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
                Let's Create Something Beautiful Together
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Whether you're looking to transform a single room or an entire property, 
                we'd love to hear about your project. Get in touch with our team to 
                schedule a consultation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-6 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <info.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-6">
                  Our Design Process
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-gold font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Initial Consultation</h4>
                      <p className="text-muted-foreground text-sm">
                        We begin with a thorough discussion of your vision, lifestyle, 
                        and design preferences to understand your unique needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-gold font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Concept Development</h4>
                      <p className="text-muted-foreground text-sm">
                        Our team develops detailed design concepts, including mood boards, 
                        space planning, and material selections.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-gold font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Design Refinement</h4>
                      <p className="text-muted-foreground text-sm">
                        We work closely with you to refine the design, incorporating 
                        your feedback until every detail is perfect.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-gold font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Implementation</h4>
                      <p className="text-muted-foreground text-sm">
                        We oversee every aspect of the installation, ensuring the 
                        final result matches our exacting standards.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">
                      What is your typical project timeline?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Project timelines vary based on scope and complexity. A single room 
                      refresh typically takes 4-8 weeks, while full home renovations can 
                      take 3-6 months or longer.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Do you work with a specific budget range?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      We work with a variety of budgets and can tailor our services 
                      accordingly. During our initial consultation, we'll discuss your 
                      budget to ensure we create a realistic plan.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Can you work with my existing furniture?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Absolutely! We're happy to incorporate pieces that are meaningful 
                      to you into the new design. We'll evaluate each item and suggest 
                      how it can best fit the overall concept.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Do you offer virtual design services?
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer virtual design consultations and services for clients 
                      outside our immediate area. Technology allows us to collaborate 
                      effectively regardless of location.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                Connect With Us
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Follow us on social media for design inspiration, behind-the-scenes 
                looks at our projects, and the latest interior design trends.
              </p>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="p-3 rounded-full bg-background text-muted-foreground hover:bg-gold hover:text-primary-foreground transition-colors"
                    data-testid={`link-social-${link.name.toLowerCase()}`}
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
