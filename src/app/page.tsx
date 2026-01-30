"use client";

import { useState } from "react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Thank you! We'll get back to you soon.",
        });
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setFeedback({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <section id="contact" className="relative bg-[#0b0b0b]">
        {/* subtle background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[color:var(--d4-yellow)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="d4-container relative py-16 md:py-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-widest text-[color:var(--d4-yellow)]">
              GET IN TOUCH
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Let's build something great
            </h2>
            <p className="mt-3 text-white/70">
              Have a project in mind? Send us details and we'll respond within{" "}
              <span className="text-white font-semibold">24 hours</span>.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            {/* Left: Contact info */}
            <div className="lg:col-span-2">
              <div className="d4-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-white">
                  Contact Information
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Reach out through any channel — we typically respond within 24 hours.
                </p>

                <div className="mt-6 grid gap-4">
                  {/* Phone */}
                  <a
                    href="tel:+94726209171"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--d4-yellow)]/15 ring-1 ring-[color:var(--d4-yellow)]/25">
                        📞
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">Phone</div>
                        <div className="mt-1 text-sm text-[color:var(--d4-yellow)] font-semibold">
                          +94 72 62 09 171
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hello@delix4.com"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--d4-yellow)]/15 ring-1 ring-[color:var(--d4-yellow)]/25">
                        ✉️
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">Email</div>
                        <div className="mt-1 text-sm text-[color:var(--d4-yellow)] font-semibold">
                          hello@delix4.com
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Website */}
                  <a
                    href="https://www.delix4.com"
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--d4-yellow)]/15 ring-1 ring-[color:var(--d4-yellow)]/25">
                        🌐
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-white">Website</div>
                        <div className="mt-1 text-sm text-[color:var(--d4-yellow)] font-semibold">
                          www.delix4.com
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Trust strip */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
                    <div>
                      ✅ Response time:{" "}
                      <span className="text-white font-semibold">within 24 hours</span>
                    </div>
                    <div>
                      ✅ Support:{" "}
                      <span className="text-white font-semibold">Mon–Sat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="d4-card p-6 md:p-8">
                <h3 className="text-base font-semibold text-white">
                  Send us a message
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Tell us what you need — we'll get back with next steps.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label className="text-xs font-semibold text-white/75">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="d4-input mt-2 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--d4-yellow)]/40"
                      placeholder="First name"
                      required
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-xs font-semibold text-white/75">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="d4-input mt-2 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--d4-yellow)]/40"
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-white/75">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="d4-input mt-2 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--d4-yellow)]/40"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-white/75">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="d4-input mt-2 w-full px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--d4-yellow)]/40"
                      placeholder="Tell us about your project..."
                      rows={6}
                      required
                    />
                  </div>

                  {feedback.message && (
                    <div
                      className={`md:col-span-2 rounded-xl px-4 py-3 text-sm border ${
                        feedback.type === "success"
                          ? "border-green-500/30 bg-green-500/10 text-green-200"
                          : "border-red-500/30 bg-red-500/10 text-red-200"
                      }`}
                    >
                      {feedback.message}
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl px-5 py-3 text-sm font-semibold
                      bg-[color:var(--d4-yellow)] text-black hover:brightness-95 transition
                      disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </button>

                    <p className="mt-3 text-center text-xs text-white/55">
                      Prefer email?{" "}
                      <a
                        className="text-white underline decoration-white/30 hover:decoration-white"
                        href="mailto:hello@delix4.com"
                      >
                        hello@delix4.com
                      </a>
                    </p>
                  </div>
                </form>
              </div>

              {/* Small note below form */}
              <p className="mt-4 text-center text-xs text-white/45">
                By submitting, you agree to be contacted by Delix4 regarding your request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
