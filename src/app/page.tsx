"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import FloatingGlow from "@/components/FloatingGlow";

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
        <FloatingGlow />
        <div className="d4-container py-20 md:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                <span className="h-2 w-2 rounded-full bg-[color:var(--d4-yellow)]" />
                Innovating Digital Partnerships
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                Welcome to{" "}
                <span className="text-[color:var(--d4-yellow)]">Delix4</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                We build modern websites, mobile apps, and scalable digital systems
                that help businesses grow — fast, secure, and future-ready.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
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
            </Reveal>
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
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                <h3 className="text-lg font-semibold">Expert Team</h3>
                <p className="mt-2 text-sm text-black/70">
                  Experienced developers and designers delivering high-quality
                  results with clean architecture.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                <h3 className="text-lg font-semibold">Innovative Solutions</h3>
                <p className="mt-2 text-sm text-black/70">
                  We stay ahead with modern technologies to solve complex problems
                  and scale smoothly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                <h3 className="text-lg font-semibold">Customer Centric</h3>
                <p className="mt-2 text-sm text-black/70">
                  Clear communication, transparent delivery, and long-term support
                  that keeps you confident.
                </p>
              </div>
            </Reveal>
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
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="d4-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-white/20">
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
              </Reveal>
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
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/10 transition-transform duration-200 hover:-translate-y-1">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (black 60%) */}
      <section id="contact" className="bg-[#0b0b0b]">
        <div className="d4-container py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold md:text-4xl">Get in Touch</h2>
            <p className="mt-3 text-white/70">
              Have a project in mind? We'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            {/* Left Column: Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                <p className="mt-2 text-white/70">
                  Reach out through any of these channels — we typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="d4-card p-5 rounded-xl">
                  <p className="text-sm text-white/60 font-medium">Phone</p>
                  <a
                    href="tel:+94726209171"
                    className="mt-2 text-lg font-semibold text-[color:var(--d4-yellow)] hover:text-white/80 transition"
                  >
                    +94 72 62 09 171
                  </a>
                </div>

                {/* Email */}
                <div className="d4-card p-5 rounded-xl">
                  <p className="text-sm text-white/60 font-medium">Email</p>
                  <a
                    href="mailto:hello@delix4.com"
                    className="mt-2 text-lg font-semibold text-[color:var(--d4-yellow)] hover:text-white/80 transition break-all"
                  >
                    hello@delix4.com
                  </a>
                </div>

                {/* Website */}
                <div className="d4-card p-5 rounded-xl">
                  <p className="text-sm text-white/60 font-medium">Website</p>
                  <a
                    href="https://www.delix4.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 text-lg font-semibold text-[color:var(--d4-yellow)] hover:text-white/80 transition"
                  >
                    www.delix4.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="d4-card p-6 md:p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                  <label className="text-sm text-white/75">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="d4-input mt-2 w-full px-4 py-3 outline-none"
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-white/75">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="d4-input mt-2 w-full px-4 py-3 outline-none"
                    placeholder="Last name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-white/75">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="d4-input mt-2 w-full px-4 py-3 outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-white/75">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="d4-input mt-2 w-full px-4 py-3 outline-none"
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                  />
                </div>

                {feedback.message && (
                  <div className={`rounded-lg px-4 py-3 text-sm ${feedback.type === "success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl px-5 py-3 text-sm font-semibold bg-[color:var(--d4-yellow)] text-black hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
