import { Brain, Cloud, Code2, Cpu, Database, Globe, Layers, Server, Smartphone } from 'lucide-react';

const techs = [
  { name: 'Next.js', icon: Globe },
  { name: 'React', icon: Code2 },
  { name: 'Node.js', icon: Server },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Flutter', icon: Smartphone },
  { name: 'Python', icon: Code2 },
  { name: 'XGBoost', icon: Brain },
  { name: 'AWS', icon: Cloud },
  { name: 'Firebase', icon: Database },
  { name: 'Supabase', icon: Database },
  { name: 'Tailwind', icon: Layers },
  { name: 'Docker', icon: Layers },
  { name: 'GraphQL', icon: Cpu },
];

// Pure CSS marquee — no JavaScript needed, and it pauses for reduced-motion users via globals.css.
export default function TechStack() {
  return (
    <div className="py-10 bg-black border-y border-white/5 relative overflow-hidden">
      <p className="text-center text-gray-500 text-xs font-semibold mb-6 uppercase tracking-widest">
        Technologies we build with
      </p>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <ul className="flex gap-12 sm:gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...techs, ...techs].map((tech, index) => (
            <li
              key={index}
              aria-hidden={index >= techs.length}
              className="flex items-center gap-3 text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              <tech.icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-base sm:text-lg font-semibold tracking-tight">{tech.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
