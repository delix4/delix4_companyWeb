"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

const variants: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Reveal({ children, className, delay = 0 }: Props) {
    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}
