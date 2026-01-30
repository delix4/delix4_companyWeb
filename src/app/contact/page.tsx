"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ChevronDown, Plus, Minus } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const faqs = [
    {
        question: "What is your typical turnaround time?",
        answer: "It depends on the project scope. Standard websites typically take 2-4 weeks, while complex web applications can take 6-12 weeks. We provide a detailed timeline during the initial consultation."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Absolutely. We provide 30 days of free support after launch to ensure everything runs smoothly. After that, we offer flexible maintenance packages to keep your software secure and up-to-date."
    },
    {
        question: "How do you handle project payments?",
        answer: "We typically work with a 50% deposit to start the project, with the remaining balance due upon successful delivery and your final approval."
    },
    {
        question: "Can you help with hosting and domain setup?",
        answer: "Yes, we handle the entire technical setup including domain registration, secure hosting configuration, and SSL implementation so you don't have to worry about the details."
    }
];

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-black pt-24 pb-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Let's Build Something <span className="text-primary">Amazing</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear about it. Reach out to us and we'll get back to you within 24 hours.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    {/* Left Column: Contact Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-12"
                    >
                        {/* Contact Details */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start group">
                                    <div className="bg-white/10 p-3 rounded-xl mr-5 group-hover:bg-primary group-hover:text-black transition-colors text-white">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                                        <p className="text-lg text-white font-medium">+94-776309171</p>
                                    </div>
                                </div>
                                <div className="flex items-start group">
                                    <div className="bg-white/10 p-3 rounded-xl mr-5 group-hover:bg-primary group-hover:text-black transition-colors text-white">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Email</p>
                                        <p className="text-lg text-white font-medium">hello@delix4.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start group">
                                    <div className="bg-white/10 p-3 rounded-xl mr-5 group-hover:bg-primary group-hover:text-black transition-colors text-white">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Office</p>
                                        <p className="text-lg text-white font-medium">Colombo, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>
                            <div className="flex gap-4">
                                {/* Social Buttons */}
                                {[
                                    { icon: Facebook, label: 'Facebook', href: '#' },
                                    { icon: Twitter, label: 'Twitter', href: '#' },
                                    { icon: Linkedin, label: 'LinkedIn', href: '#' }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300"
                                    >
                                        <social.icon className="h-6 w-6" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-400">Everything you need to know about working with us.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/10"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-medium text-white pr-8">{faq.question}</span>
                                    <div className={`p-1 rounded-full ${openFaq === index ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
                                        {openFaq === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mx-6 mt-2 mb-2">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
