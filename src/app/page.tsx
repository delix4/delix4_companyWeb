"use client";

import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce solution with payment integration and inventory management.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Finance Dashboard',
    category: 'Data Visualization',
    description: 'Real-time financial data visualization dashboard for investment firms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Health & Fitness App',
    category: 'Mobile App',
    description: 'Cross-platform mobile application for tracking workouts and nutrition.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Corporate Portfolio',
    category: 'Branding',
    description: 'Modern corporate website with CMS integration for a leading architecture firm.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <div className="bg-black text-white">
      {/* HOME SECTION */}
      <section id="home" className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-yellow-400">Delix4</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We build innovative digital solutions to help your business grow. From web development to strategic consulting, we are your partners in success.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 gap-4">
            <div className="rounded-md shadow">
              <a href="/#services" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 md:py-4 md:text-lg md:px-10 transition-colors">
                Get Started
              </a>
            </div>
            <div className="rounded-md shadow">
              <a href="/#contact" className="w-full flex items-center justify-center px-8 py-3 border border-yellow-400 text-base font-medium rounded-md text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black md:py-4 md:text-lg md:px-10 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="w-full bg-gray-900 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white">Why Choose Us?</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-black overflow-hidden rounded-lg p-6 border border-yellow-400">
                <h3 className="text-lg font-medium text-yellow-400">Expert Team</h3>
                <p className="mt-2 text-base text-gray-300">
                  Our team consists of experienced professionals dedicated to delivering top-notch results.
                </p>
              </div>
              <div className="bg-black overflow-hidden rounded-lg p-6 border border-yellow-400">
                <h3 className="text-lg font-medium text-yellow-400">Innovative Solutions</h3>
                <p className="mt-2 text-base text-gray-300">
                  We stay ahead of the curve, utilizing the latest technologies to solve complex problems.
                </p>
              </div>
              <div className="bg-black overflow-hidden rounded-lg p-6 border border-yellow-400">
                <h3 className="text-lg font-medium text-yellow-400">Customer Centric</h3>
                <p className="mt-2 text-base text-gray-300">
                  Your success is our priority. We work closely with you to understand your unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="w-full bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              What We Offer
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative border-l-4 border-yellow-400 pl-6">
                <dt>
                  <p className="text-lg leading-6 font-medium text-yellow-400">Web Development</p>
                </dt>
                <dd className="mt-2 text-base text-gray-300">
                  Responsive, high-performance websites built with modern technologies like Next.js, React, and Tailwind CSS.
                </dd>
              </div>

              <div className="relative border-l-4 border-yellow-400 pl-6">
                <dt>
                  <p className="text-lg leading-6 font-medium text-yellow-400">Mobile App Development</p>
                </dt>
                <dd className="mt-2 text-base text-gray-300">
                  Native and cross-platform mobile applications for iOS and Android to engage your customers on the go.
                </dd>
              </div>

              <div className="relative border-l-4 border-yellow-400 pl-6">
                <dt>
                  <p className="text-lg leading-6 font-medium text-yellow-400">Digital Marketing</p>
                </dt>
                <dd className="mt-2 text-base text-gray-300">
                  Strategic marketing campaigns to boost your online presence, traffic, and conversions.
                </dd>
              </div>

              <div className="relative border-l-4 border-yellow-400 pl-6">
                <dt>
                  <p className="text-lg leading-6 font-medium text-yellow-400">Consulting</p>
                </dt>
                <dd className="mt-2 text-base text-gray-300">
                  Expert advice on technology strategy, digital transformation, and business process optimization.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="w-full bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">Portfolio</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Our Recent Work
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
              Check out some of the projects we&apos;ve delivered for our happy clients.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project) => (
              <div key={project.title} className="flex flex-col rounded-lg border border-yellow-400 overflow-hidden bg-black">
                <div className="flex-shrink-0 relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-400">
                      {project.category}
                    </p>
                    <p className="block mt-2">
                      <p className="text-xl font-semibold text-white">{project.title}</p>
                      <p className="mt-3 text-base text-gray-300">{project.description}</p>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full bg-black py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Contact Us</h2>
            <p className="mt-4 text-lg leading-6 text-gray-300">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-yellow-400">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                    className="py-3 px-4 block w-full bg-gray-900 text-white shadow-sm focus:ring-yellow-400 focus:border-yellow-400 border border-gray-700 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-yellow-400">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    className="py-3 px-4 block w-full bg-gray-900 text-white shadow-sm focus:ring-yellow-400 focus:border-yellow-400 border border-gray-700 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-yellow-400">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="py-3 px-4 block w-full bg-gray-900 text-white shadow-sm focus:ring-yellow-400 focus:border-yellow-400 border border-gray-700 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-yellow-400">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="py-3 px-4 block w-full bg-gray-900 text-white shadow-sm focus:ring-yellow-400 focus:border-yellow-400 border border-gray-700 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors"
                >
                  Let&apos;s talk
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
