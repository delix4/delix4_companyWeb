'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Heart, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

const perks = [
  {
    icon: Globe,
    title: 'Remote First',
    desc: 'Work from anywhere in the world. We believe in talent, not geography.',
  },
  {
    icon: Zap,
    title: 'Flexible Hours',
    desc: 'We value output over hours. Manage your time the way that works best for you.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    desc: 'Comprehensive health coverage and wellness stipends to keep you at your best.',
  },
  {
    icon: Users,
    title: 'Team Retreats',
    desc: 'Annual all-expenses-paid team gatherings in exotic locations.',
  },
];

const jobs = [
  {
    title: 'Software Engineer Intern',
    department: 'Engineering',
    location: 'Remote',
    type: 'Internship',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
            We&apos;re Hiring
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join the <span className="text-primary">Revolution</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We&apos;re on a mission to redefine digital excellence. If you&apos;re passionate,
            innovative, and ready to make an impact, we want you on our team.
          </p>
        </motion.div>

        {/* Perks Section */}
        <div className="mb-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Why Delix4?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-primary">
                  <perk.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-gray-400 text-sm">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Open Positions</h2>
              <p className="text-gray-400">Come help us build the future.</p>
            </div>
            <Link
              href="/contact"
              className="hidden md:flex items-center text-primary hover:text-white transition-colors mt-4 md:mt-0"
            >
              Contact for general inquiries <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all flex flex-col md:flex-row items-center justify-between"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                  <div className="bg-gray-800 p-3 rounded-xl">
                    <Briefcase className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex gap-4 text-sm text-gray-400 mt-1">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="w-full md:w-auto px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-primary transition-colors text-center"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
