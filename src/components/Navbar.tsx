"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={[
                "sticky top-0 z-50 w-full",
                "transition-all duration-200",
                isScrolled
                    ? "bg-[#0b0b0b]/80 backdrop-blur border-b border-white/10"
                    : "bg-transparent",
            ].join(" ")}
        >
            <div className="d4-container flex h-16 items-center justify-between">
                <Link href="/#home" className="font-semibold tracking-tight">
                    <span className="text-white">Delix</span>
                    <span className="text-[color:var(--d4-yellow)]">4</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/#contact"
                        className="ml-2 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold bg-[color:var(--d4-yellow)] text-black hover:brightness-95 transition"
                    >
                        Let's Talk
                    </Link>
                </nav>

                <div className="md:hidden flex items-center gap-2">
                    <Link
                        href="/#contact"
                        className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold bg-[color:var(--d4-yellow)] text-black hover:brightness-95 transition"
                    >
                        Contact
                    </Link>

                    <button
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold border border-white/15 bg-white/5 text-white"
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden border-t border-white/10 bg-[#0b0b0b]/95 backdrop-blur">
                    <div className="d4-container py-3 flex flex-col gap-2 text-sm">
                        {NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="rounded-xl px-3 py-2 text-white/80 hover:text-white hover:bg-white/5"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
                    )}
        </header>
    );
}
