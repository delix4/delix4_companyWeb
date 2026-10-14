import { MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';

export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-lg shadow-ink/25 transition-transform hover:scale-110 animate-pop-in"
      aria-label="Chat with Delix4 on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-white fill-white" aria-hidden />
      <span className="absolute right-full mr-3 hidden md:block bg-ink text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
