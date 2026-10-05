import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers – Join the Delix4 Team',
  description:
    'Work on real web, mobile and AI products with a small, remote-first engineering team. See open roles and internships at Delix4.',
  alternates: { canonical: '/careers' },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
