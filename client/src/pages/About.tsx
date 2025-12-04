import { motion } from "framer-motion";
import { Award, Users, Target, Heart } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We are committed to delivering exceptional quality in every project, pushing the boundaries of design innovation while maintaining the highest standards of craftsmanship.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe that the best designs emerge from close collaboration with our clients. Your vision is the foundation of every project we undertake.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "Every detail matters. From initial concept to final installation, we approach each element with meticulous attention and precision.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our love for design drives everything we do. We pour our heart into creating spaces that inspire joy and enhance daily life.",
  },
];

const team = [
  {
    name: "Victoria Chen",
    role: "Founder & Creative Director",
    bio: "With over 20 years of experience in luxury interior design, Victoria leads our creative vision and ensures every project meets our exacting standards.",
  },
  {
    name: "Marcus Johnson",
    role: "Principal Designer",
    bio: "Marcus brings a fresh perspective to contemporary design, blending modern aesthetics with timeless elegance in residential and commercial spaces.",
  },
  {
    name: "Elena Rodriguez",
    role: "Senior Interior Designer",
    bio: "Specializing in minimalist and Scandinavian design, Elena creates serene spaces that prioritize functionality without sacrificing beauty.",
  },
];

export default function About() {
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
                About Us
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4">
                We Create Spaces That Tell Your Story
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Founded in 2010, Luxe Interiors has grown from a small design studio 
                to an award-winning firm renowned for creating exceptional residential 
                and commercial interiors across the globe.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-4">
                A Legacy of Design Excellence
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="text-muted-foreground leading-relaxed">
                  What began as a passion project by our founder Victoria Chen has evolved 
                  into a comprehensive design practice serving discerning clients who value 
                  exceptional craftsmanship and innovative design thinking.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our journey has been marked by countless collaborations with architects, 
                  artisans, and craftspeople who share our commitment to excellence. From 
                  intimate residential projects to expansive commercial spaces, each undertaking 
                  is approached with the same dedication and attention to detail.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, our team of talented designers continues to push the boundaries of 
                  what's possible, creating spaces that not only meet but exceed the expectations 
                  of our clients while standing the test of time.
                </p>
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
                    <span className="block font-serif text-4xl font-semibold text-gold">
                      250+
                    </span>
                    <span className="text-sm text-muted-foreground mt-1 block">
                      Projects Completed
                    </span>
                  </div>
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">
                      12
                    </span>
                    <span className="text-sm text-muted-foreground mt-1 block">
                      Countries Served
                    </span>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">
                      15
                    </span>
                    <span className="text-sm text-muted-foreground mt-1 block">
                      Design Awards
                    </span>
                  </div>
                  <div className="bg-background p-6 rounded-md text-center">
                    <span className="block font-serif text-4xl font-semibold text-gold">
                      25+
                    </span>
                    <span className="text-sm text-muted-foreground mt-1 block">
                      Team Members
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-4">
                Core Values
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision we make and every space we create.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-4">
                Meet the Designers
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                A talented team of creative professionals dedicated to bringing your vision to life.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-6 rounded-lg text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <span className="font-serif text-2xl text-muted-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                  <p className="text-gold text-sm mt-1">{member.role}</p>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
