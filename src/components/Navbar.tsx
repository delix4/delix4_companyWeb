"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/#home" className="text-2xl font-bold text-yellow-400">
                            Delix4
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="/#home" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </a>
                            <a href="/#services" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Services
                            </a>
                            <a href="/#projects" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Projects
                            </a>
                            <a href="/#contact" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-black inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-yellow-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/#home" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                            Home
                        </a>
                        <a href="/#services" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                            Services
                        </a>
                        <a href="/#projects" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                            Projects
                        </a>
                        <a href="/#contact" className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
