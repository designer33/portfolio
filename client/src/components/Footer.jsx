import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const navLinks = [
        { id: 'home', label: t('nav.home') },
        { id: 'about', label: t('nav.about') },
        { id: 'skills', label: t('nav.services') },
        { id: 'projects', label: t('nav.portfolio') },
        { id: 'blog', label: t('nav.blog') },
        { id: 'contact', label: t('nav.contact') },
    ];

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight mb-1">
                            <span className="text-gradient">IRFAN</span> RASHID
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{t('footer.desc')}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                        {navLinks.map((link) => (
                            <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-primary transition-colors cursor-pointer">
                                {link.label}
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

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
                    <p>&copy; {new Date().getFullYear()} Irfan Rashid. {t('footer.rights')}</p>
                    <p className="text-[10px] opacity-30 uppercase tracking-[0.2em]">v1.1 - Multilingual</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
