import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 text-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-6">
                            <Image
                                src="/logo.jpg"
                                alt="Delix4 Logo"
                                width={200}
                                height={80}
                                className="h-24 w-auto object-contain rounded-md bg-white p-1"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
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
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
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
