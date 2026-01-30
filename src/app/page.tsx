"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Code, Smartphone, BarChart, Zap, CheckCircle, Mail, Phone } from "lucide-react";
import ProjectsSection from "@/components/ProjectsSection";
import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";
import ContactForm from "@/components/ContactForm";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Tech Stack Ticker */}
      <TechStack />

      {/* Services Section */}
      <section id="services" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Our Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Engineering Excellence</h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Code, title: "Web Development", desc: "High-performance websites built with Next.js and React." },
              { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile applications." },
              { icon: BarChart, title: "Digital Marketing", desc: "Strategic campaigns to boost your online presence." },
              { icon: Zap, title: "Consulting", desc: "Expert tech strategy and digital transformation advice." },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-colors text-white">
                  <service.icon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 md:row-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="bg-primary/20 p-3 rounded-2xl w-fit mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Lightning Fast Delivery</h3>
                  <p className="text-gray-400 text-lg">We don't just build; we launch. Our streamlined agile workflow ensuring your project goes from concept to market in record time without compromising quality.</p>
                </div>
                <div className="mt-8">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-xs text-white">U{i}</div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-primary border-2 border-black flex items-center justify-center text-xs font-bold text-black">+20</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Happy clients worldwide</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
              <div className="w-full bg-gray-800 h-1 mt-4 rounded-full overflow-hidden">
                <div className="bg-green-500 w-[98%] h-full"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
              <CheckCircle className="h-8 w-8 text-primary mt-4 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Ready to Start a Project?</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-white mb-6">Contact Information</h4>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-primary mt-1 mr-4" />
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">+94-776309171</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary mt-1 mr-4" />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">hello@delix4.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
