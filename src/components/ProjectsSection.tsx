'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Revolution',
    category: 'Web Development',
    description:
      'A full-featured online store with real-time inventory management, secure payments, and AI-driven product recommendations.',
    image: '/banner.jpg',
    tech: ['Next.js', 'Stripe', 'Supabase'],
  },
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    description:
      'Real-time financial analytics dashboard for a leading investment firm, processing millions of data points daily.',
    image: '/banner.jpg',
    tech: ['React', 'D3.js', 'Node.js'],
  },
  {
    title: 'Fitness Tracker App',
    category: 'Mobile App',
    description:
      'Cross-platform mobile application for tracking workouts, nutrition, and connecting with personal trainers.',
    image: '/banner.jpg',
    tech: ['React Native', 'Firebase', 'HealthKit'],
  },
  {
    title: 'Corporate Identity',
    category: 'Branding & Design',
    description:
      'Complete digital rebranding for a global logistics company, including website, design system, and marketing assets.',
    image: '/banner.jpg',
    tech: ['Figma', 'Tailwind CSS', 'Motion'],
  },
  {
    title: 'Smart Home Hub',
    category: 'IoT Solution',
    description:
      'Centralized control interface for smart home devices, featuring voice control integration and energy monitoring.',
    image: '/banner.jpg',
    tech: ['IoT', 'WebSockets', 'PWA'],
  },
  {
    title: 'Travel Companion',
    category: 'Mobile App',
    description:
      'AI-powered travel planner that creates personalized itineraries and provides real-time local recommendations.',
    image: '/banner.jpg',
    tech: ['Flutter', 'OpenAI API', 'Google Maps'],
  },
];

const categories = [
  'All',
  'Web Development',
  'Mobile App',
  'Branding & Design',
  'IoT Solution',
  'Web Application',
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Our Work
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="text-primary">Featured</span> Projects
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how we&apos;ve helped businesses transform their digital presence with
            cutting-edge technology and design.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-2 bg-white rounded-full text-black hover:bg-primary transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-black hover:bg-primary transition-colors">
                      <Github className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-primary text-sm font-medium mb-2">{project.category}</div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">No projects found in this category.</div>
        )}
      </div>
    </section>
  );
}
