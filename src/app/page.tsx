export default function HomePage() {
  return (
    <main>
      {/* HERO / WELCOME */}
      <section id="home" className="relative overflow-hidden">
        {/* subtle yellow glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--d4-yellow)]/20 blur-3xl" />
        <div className="d4-container py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              <span className="h-2 w-2 rounded-full bg-[color:var(--d4-yellow)]" />
              Innovating Digital Partnerships
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Welcome to{" "}
              <span className="text-[color:var(--d4-yellow)]">Delix4</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
              We build modern websites, mobile apps, and scalable digital systems
              that help businesses grow — fast, secure, and future-ready.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                bg-[color:var(--d4-yellow)] text-black hover:brightness-95 transition"
              >
                Get Started
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (white 10% zone) */}
      <section className="bg-white text-black">
        <div className="d4-container py-16 md:py-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-black/70">
            A focused team, modern stack, and reliable delivery — built for real
            business outcomes.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Expert Team</h3>
              <p className="mt-2 text-sm text-black/70">
                Experienced developers and designers delivering high-quality
                results with clean architecture.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Innovative Solutions</h3>
              <p className="mt-2 text-sm text-black/70">
                We stay ahead with modern technologies to solve complex problems
                and scale smoothly.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Customer Centric</h3>
              <p className="mt-2 text-sm text-black/70">
                Clear communication, transparent delivery, and long-term support
                that keeps you confident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (black 60%) */}
      <section id="services" className="bg-[#0b0b0b]">
        <div className="d4-container py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-[color:var(--d4-yellow)]">
              SERVICES
            </p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              What We Offer
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/70">
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Web Development",
                desc: "Responsive, fast websites built with modern frameworks like Next.js, React, and Tailwind.",
              },
              {
                title: "Mobile App Development",
                desc: "Cross-platform apps for Android and iOS with smooth UX and scalable architecture.",
              },
              {
                title: "UI/UX Design",
                desc: "Clean, user-first interfaces with strong branding and conversion-focused layouts.",
              },
              {
                title: "Cloud & Deployment",
                desc: "Secure hosting, CI/CD, and production deployment on AWS, VPS, or modern platforms.",
              },
            ].map((s) => (
              <div key={s.title} className="d4-card p-6">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-[color:var(--d4-yellow)]/15 ring-1 ring-[color:var(--d4-yellow)]/25" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS (yellow 30%) */}
      <section id="projects" className="bg-[color:var(--d4-yellow)] text-black">
        <div className="d4-container py-16 md:py-20">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-black/70">
              PORTFOLIO
            </p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Our Recent Work
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-black/70">
              A few examples of solutions we build — scalable, clean, and business-ready.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                tag: "Web Development",
                title: "E-Commerce Platform",
                desc: "Payment integration, inventory management, and admin dashboard with modern UI.",
              },
              {
                tag: "Data Visualization",
                title: "Finance Dashboard",
                desc: "Real-time charts, KPI monitoring, and secure user access for decision-makers.",
              },
              {
                tag: "Mobile App",
                title: "Health & Fitness App",
                desc: "Workout tracking, progress insights, and personalized plans with clean UX.",
              },
              {
                tag: "Branding",
                title: "Corporate Portfolio",
                desc: "High-converting business website with CMS-ready content structure.",
              },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm border border-black/10">
                <p className="text-xs font-semibold text-black/60">{p.tag}</p>
                <h3 className="mt-2 text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm text-black/70">{p.desc}</p>

                <a
                  href="#contact"
                  className="mt-4 inline-flex text-sm font-semibold text-black underline decoration-black/30 hover:decoration-black"
                >
                  Request Similar Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (black 60%) */}
      <section id="contact" className="bg-[#0b0b0b]">
        <div className="d4-container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">Contact Us</h2>
            <p className="mt-3 text-white/70">
              Send us a message — we'll respond as soon as possible.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl d4-card p-6 md:p-8">
            <form className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <label className="text-sm text-white/75">First name</label>
                <input className="d4-input mt-2 w-full px-4 py-3 outline-none" placeholder="First name" />
              </div>

              <div className="md:col-span-1">
                <label className="text-sm text-white/75">Last name</label>
                <input className="d4-input mt-2 w-full px-4 py-3 outline-none" placeholder="Last name" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white/75">Email</label>
                <input className="d4-input mt-2 w-full px-4 py-3 outline-none" placeholder="you@example.com" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-white/75">Message</label>
                <textarea
                  className="d4-input mt-2 w-full px-4 py-3 outline-none"
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  className="w-full rounded-xl px-5 py-3 text-sm font-semibold
                  bg-[color:var(--d4-yellow)] text-black hover:brightness-95 transition"
                >
                  Let's talk
                </button>
                <p className="mt-3 text-center text-xs text-white/55">
                  Or email us directly:{" "}
                  <a className="text-white underline decoration-white/30 hover:decoration-white" href="mailto:hello@delix4.com">
                    hello@delix4.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
