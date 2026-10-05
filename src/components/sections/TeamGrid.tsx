import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { team } from '@/lib/company';
import { Tag } from '@/components/ui/primitives';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

// Renders nothing until real team members are added in src/lib/company.ts.
export default function TeamGrid({ className = '' }: { className?: string }) {
  if (team.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-2xl md:text-3xl font-bold text-white text-center">Meet the team</h3>
      <p className="mt-3 text-center text-gray-400">The people you will work with directly.</p>
      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <li key={member.name} className="rounded-2xl border border-white/10 bg-white/3 p-6 text-center">
            <div className="relative mx-auto h-28 w-28 rounded-full overflow-hidden border-2 border-primary/40 bg-gray-900">
              {member.photo ? (
                <Image src={member.photo} alt={`${member.name}, ${member.role} at Delix4`} fill sizes="112px" className="object-cover" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                  {initials(member.name)}
                </span>
              )}
            </div>
            <h4 className="mt-5 text-lg font-bold text-white">{member.name}</h4>
            <p className="text-sm text-primary">{member.role}</p>
            {member.bio && <p className="mt-3 text-sm text-gray-400">{member.bio}</p>}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {member.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="mt-5 flex justify-center gap-3">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-primary" aria-label={`${member.name} on LinkedIn`}>
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-primary" aria-label={`${member.name} on GitHub`}>
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
