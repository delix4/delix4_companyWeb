"use client";

import { motion } from "framer-motion";

export default function FloatingGlow() {
    return (
        <motion.div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--d4-yellow)]/20 blur-3xl"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}
