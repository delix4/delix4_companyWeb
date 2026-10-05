import { MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';

export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-black/40 transition-transform hover:scale-110 animate-pop-in"
      aria-label="Chat with Delix4 on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white fill-white" aria-hidden />
      <span className="absolute right-full mr-3 hidden md:block bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
