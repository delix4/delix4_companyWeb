import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-[#0b0b0b]">
            <div className="d4-container py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <div className="text-lg font-semibold">
                            <span className="text-white">Delix</span>
                            <span className="text-[color:var(--d4-yellow)]">4</span>
                        </div>
                        <p className="mt-3 text-sm text-white/70 leading-relaxed">
                            Innovating Digital Partnerships — we design and build modern web,
                            mobile, and cloud solutions for growing businesses.
                        </p>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-white">Quick Links</div>
                        <div className="mt-3 flex flex-col gap-2 text-sm">
                            <Link className="text-white/70 hover:text-white" href="/#home">
                                Home
                            </Link>
                            <Link className="text-white/70 hover:text-white" href="/#services">
                                Services
                            </Link>
                            <Link className="text-white/70 hover:text-white" href="/#projects">
                                Projects
                            </Link>
                            <Link className="text-white/70 hover:text-white" href="/#contact">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-white">Contact Us</div>
                        <div className="mt-3 space-y-2 text-sm text-white/70">
                            <p>
                                Email:{" "}
                                <a className="text-white hover:underline" href="mailto:hello@delix4.com">
                                    hello@delix4.com
                                </a>
                            </p>
                            <p>
                                Phone:{" "}
                                <a className="text-white hover:underline" href="tel:+94726209171">
                                    +94 72 62 09 171
                                </a>
                            </p>
                            <p>
                                Website:{" "}
                                <a className="text-white hover:underline" href="https://www.delix4.com" target="_blank" rel="noreferrer">
                                    www.delix4.com
                                </a>
                            </p>
                        </div>

                        <div className="mt-4 flex gap-3">
                            {/* Keep icons later if you already had them; for now placeholders */}
                            <span className="h-9 w-9 rounded-xl border border-white/10 bg-white/5" />
                            <span className="h-9 w-9 rounded-xl border border-white/10 bg-white/5" />
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/55">
                    © {new Date().getFullYear()} Delix4. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
