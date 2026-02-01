"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Code, BarChart, CheckCircle } from "lucide-react";

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black selection:bg-primary/30 selection:text-white pt-36 lg:pt-32">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[100px] animate-blob mix-blend-screen opacity-20"></div>
                <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen opacity-20"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-md"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-sm text-gray-300 font-medium">Available for new projects</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            Innovating <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-yellow-500 animate-gradient-x">
                                Digital Future
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            We architect scalable digital solutions that drive growth. From enterprise platforms to immersive web experiences, Delix4 is your partner in digital transformation.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <Link
                                href="/projects"
                                className="group relative px-8 py-4 bg-primary text-black font-bold rounded-full overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center">
                                    View Our Work <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                href="/contact"
                                className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full backdrop-blur-sm hover:bg-white/10 transition-all flex items-center justify-center"
                            >
                                Get a Quote <Sparkles className="ml-2 h-4 w-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Stats - Horizontal on Mobile, Grid on Desktop */}
                        <motion.div
                            className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 lg:gap-12 border-t border-white/10 pt-8 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {[
                                { label: "Projects", value: "50+" },
                                { label: "Satisfaction", value: "98%" },
                                { label: "Exp. Years", value: "5+" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start">
                                    <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Dynamic Tech Visuals */}
                    <div className="relative hidden lg:block h-[600px] w-full select-none pointer-events-none">
                        {/* Floating Card 1: Analytic Graph */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-72 shadow-2xl z-20"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><BarChart size={20} /></div>
                                <div className="text-white font-semibold">Growth</div>
                            </div>
                            <div className="h-24 flex items-end gap-2">
                                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                    <div key={i} className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating Card 2: Code Snippet */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 right-20 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-80 shadow-2xl z-30"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Code size={20} /></div>
                                <div className="text-white font-semibold flex-1">SmartContract.sol</div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <div className="space-y-2 font-mono text-xs text-gray-400">
                                <div className="flex"><span className="text-purple-400 mr-2">function</span><span className="text-yellow-300">optimize</span>() <span className="text-gray-500">{`{`}</span></div>
                                <div className="pl-4"><span className="text-blue-400">return</span> <span className="text-green-400">&quot;Efficiency&quot;</span>;</div>
                                <div className="text-gray-500">{`}`}</div>
                            </div>
                        </motion.div>

                        {/* Floating Card 3: Success Badge */}
                        <motion.div
                            animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute top-1/2 left-0 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl z-20"
                        >
                            <div className="bg-green-500 rounded-full p-1 text-black">
                                <CheckCircle size={20} className="fill-current" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-lg">Deployed</div>
                                <div className="text-gray-300 text-xs">Just now</div>
                            </div>
                        </motion.div>

                        {/* Decorative Blob behind visuals */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px] pointer-events-none z-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
