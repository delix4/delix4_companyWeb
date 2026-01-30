import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 text-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1 flex flex-col items-start">
                        <div className="mb-6 -ml-2">
                            <Image
                                src="/logo.png"
                                alt="Delix4 Logo"
                                width={280}
                                height={130}
                                className="h-32 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Innovating Digital Partnerships. We provide cutting-edge solutions for your business needs.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="#home" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Services</Link></li>
                            <li><Link href="#why-us" className="text-gray-400 hover:text-primary transition-colors text-sm">Why Us</Link></li>
                            <li><Link href="/careers" className="text-gray-400 hover:text-primary transition-colors text-sm">Careers</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Contact</h3>
                        <div className="space-y-4">
                            <p className="text-gray-400 text-sm">Email: <span className="text-white block mt-1">hello@delix4.com</span></p>
                            <p className="text-gray-400 text-sm">Phone: <span className="text-white block mt-1">+94-72-62-09-171</span></p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Follow Us</h3>
                        <div className="flex space-x-8">
                            <a href="https://www.facebook.com/profile.php?id=61587168062633" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-7 w-7" />
                            </a>
                            <a href="https://www.instagram.com/delix4_?igsh=NDAxOXlzdjJyZG15" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-7 w-7" />
                            </a>
                            <a href="https://www.linkedin.com/company/delix4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-7 w-7" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Delix4. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
