import { Brain, CheckCircle2, Globe, Smartphone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/primitives';
import { stats } from '@/lib/company';

// Rendered on the server with no entrance animation on the headline, so it can paint as the LCP element immediately.
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black pt-32 pb-20 md:pt-40 md:pb-28 lg:min-h-[90vh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute top-1/4 -right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-7 text-sm text-gray-300">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Now taking new projects
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] text-balance">
              Building digital products that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-yellow-500">
                help businesses grow
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We build scalable web, mobile and AI solutions for startups and modern businesses —
              from first idea to launch and beyond.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <ButtonLink href="/contact" arrow>
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/case-studies" variant="secondary">
                View Our Work
              </ButtonLink>
            </div>

            <ul className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-gray-400">
              {['Web Development', 'Mobile Apps', 'AI & Machine Learning'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse text-center lg:text-left">
                  <dt className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

/** Illustrative product mock-up: a web dashboard, a phone app and an AI model card. */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none h-[360px] sm:h-[440px] lg:h-[520px] select-none" aria-hidden>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[90px]" />

      {/* Browser window */}
      <div className="absolute top-0 left-0 right-8 sm:right-16 rounded-2xl border border-white/10 bg-gray-950/90 shadow-2xl backdrop-blur overflow-hidden animate-float-slow">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 flex-1 max-w-[200px] h-5 rounded bg-white/5 text-[10px] text-gray-500 flex items-center px-2 gap-1">
            <Globe className="h-3 w-3" /> app.yourproduct.com
          </span>
        </div>
        <div className="p-5 grid grid-cols-3 gap-3">
          <div className="col-span-3 flex items-center justify-between">
            <div>
              <div className="h-2.5 w-24 rounded bg-white/20" />
              <div className="h-2 w-16 rounded bg-white/10 mt-2" />
            </div>
            <div className="h-7 w-20 rounded-full bg-primary/90" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/5 p-3">
              <div className="h-2 w-10 rounded bg-white/15" />
              <div className="h-4 w-14 rounded bg-white/25 mt-2" />
            </div>
          ))}
          <div className="col-span-3 rounded-xl bg-white/5 border border-white/5 p-3 h-28 sm:h-32 flex items-end gap-1.5">
            {[35, 50, 42, 65, 58, 72, 68, 85, 78, 92].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/20 to-primary/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-0 right-0 w-36 sm:w-44 rounded-[1.75rem] border-4 border-gray-800 bg-gray-950 shadow-2xl overflow-hidden animate-float">
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-800" />
        <div className="p-3 space-y-2.5">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-primary" />
            <div className="h-2 w-16 rounded bg-white/20" />
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 p-3">
            <div className="h-2 w-12 rounded bg-white/30" />
            <div className="mt-3 h-14 w-14 mx-auto rounded-full border-4 border-primary/70 border-t-white/10" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
              <div className="h-5 w-5 rounded-md bg-white/10" />
              <div className="flex-1 h-2 rounded bg-white/15" />
            </div>
          ))}
        </div>
      </div>

      {/* AI card */}
      <div className="absolute bottom-10 left-0 sm:left-4 w-56 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 shadow-2xl animate-float-delayed">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-primary/15 text-primary">
            <Brain className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-white">Model inference</span>
        </div>
        <div className="space-y-2 font-mono text-[11px]">
          <div className="flex justify-between text-gray-400">
            <span>status</span>
            <span className="text-green-400">ready</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>pipeline</span>
            <span className="text-white">vision → predict</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary to-yellow-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
