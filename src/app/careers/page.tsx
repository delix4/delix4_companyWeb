import Reveal from '@/components/ui/Reveal';
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
    title: 'Real Product Work',
    desc: 'Work on web, mobile and AI products that ship to real users — not throwaway tasks.',
  },
  {
    icon: Users,
    title: 'Small, Direct Team',
    desc: 'Work closely with the founders, get honest feedback and see your impact quickly.',
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
    <div className="min-h-screen bg-page pt-28 md:pt-32 pb-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgba(37,99,235,0.12),transparent)] pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-2 rounded-full bg-subtle border border-line text-link text-sm font-medium mb-6">
            We&apos;re Hiring
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-heading mb-6">
            Build real products <span className="text-link">with us</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            We&apos;re a small, remote-first team building web, mobile and AI products for clients
            worldwide. If you care about quality engineering and want to learn fast, we&apos;d
            love to hear from you.
          </p>
        </div>

        {/* Perks Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-heading text-center mb-12">Why Delix4?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <Reveal
                key={index}
                delay={index * 0.08}
                className="bg-card border border-line p-6 rounded-2xl hover:border-primary/40 transition-colors"
              >
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-link">
                  <perk.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">{perk.title}</h3>
                <p className="text-muted text-sm">{perk.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-heading mb-2">Open Positions</h2>
              <p className="text-muted">Current openings at Delix4.</p>
            </div>
            <Link
              href="/contact"
              className="hidden md:flex items-center text-link hover:text-heading transition-colors mt-4 md:mt-0"
            >
              Contact for general inquiries <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Reveal
                key={index}
                className="group bg-subtle border border-line p-6 rounded-2xl hover:border-primary/50 transition-all flex flex-col md:flex-row items-center justify-between"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                  <div className="bg-fill p-3 rounded-xl">
                    <Briefcase className="h-6 w-6 text-body" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-heading group-hover:text-link transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex gap-4 text-sm text-muted mt-1">
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
                  className="w-full md:w-auto px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors text-center"
                >
                  Apply Now
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
