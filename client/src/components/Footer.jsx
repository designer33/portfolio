import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight mb-1">
                            <span className="text-gradient">IRFAN</span> RASHID
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Senior Frontend Developer & UI/UX Designer</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                        {['home', 'about', 'skills', 'projects', 'blog', 'contact'].map((id) => (
                            <button key={id} onClick={() => scrollTo(id)} className="hover:text-primary capitalize transition-colors cursor-pointer">
                                {id === 'skills' ? 'Services' : id === 'projects' ? 'Portfolio' : id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="flex space-x-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                            <Github size={22} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                            <Linkedin size={22} />
                        </a>
                        <a href="mailto:info@irfanrashid.com" className="p-2 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                            <Mail size={22} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} Irfan Rashid. All rights reserved. Built with React & Node.js.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
