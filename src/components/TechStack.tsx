"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Smartphone, Server, Cpu, Cloud, Layers } from "lucide-react";

const techs = [
    { name: "Next.js", icon: Globe },
    { name: "React", icon: Code2 },
    { name: "Node.js", icon: Server },
    { name: "TypeScript", icon: Code2 },
    { name: "Flutter", icon: Smartphone },
    { name: "AWS", icon: Cloud },
    { name: "Firebase", icon: Database },
    { name: "Python", icon: Code2 },
    { name: "Supabase", icon: Database },
    { name: "Tailwind", icon: Layers },
    { name: "Docker", icon: Layers },
    { name: "GraphQL", icon: Cpu }
];

export default function TechStack() {
    return (
        <div className="py-10 bg-black border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none bg-gradient-to-r from-black via-transparent to-black"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
                <motion.div
                    className="flex gap-16 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {[...techs, ...techs].map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3 text-gray-500 hover:text-primary transition-colors cursor-default group">
                            <tech.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            <span className="text-lg font-semibold tracking-tight">{tech.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
