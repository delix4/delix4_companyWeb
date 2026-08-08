'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://wa.me/94776309171"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-green-500/30 transition-all hover:scale-110 group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-8 w-8 text-white fill-white" />
        <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Chat with us!
        </span>
      </Link>
    </motion.div>
  );
}
