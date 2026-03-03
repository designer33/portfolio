import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'it' : 'en';
        i18n.changeLanguage(newLang);
    };

    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: t('nav.home'), id: 'home' },
        { name: t('nav.about'), id: 'about' },
        { name: t('nav.services'), id: 'skills' },
        { name: t('nav.portfolio'), id: 'projects' },
        { name: t('nav.blog'), id: 'blog' },
        { name: t('nav.contact'), id: 'contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-2xl font-bold text-gradient tracking-tight">IRFAN</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => scrollToSection(e, link.id)}
                                className="cursor-pointer hover:text-primary transition-colors font-medium text-slate-700 dark:text-slate-300"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button onClick={toggleLanguage} className="p-2 flex items-center gap-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm font-medium">
                            <Globe size={18} />
                            <span className="uppercase">{i18n.language}</span>
                        </button>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button onClick={toggleLanguage} className="p-2 flex items-center gap-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-xs font-bold uppercase">
                            <Globe size={16} /> {i18n.language}
                        </button>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full glass shadow-xl border-t border-slate-200/20">
                    <div className="px-4 py-4 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => scrollToSection(e, link.id)}
                                className="block text-lg font-medium hover:text-primary transition-colors py-2 border-b border-slate-200/20 dark:border-slate-800/50 last:border-none"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
