import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Animated background shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20 font-semibold mb-6">
                        Welcome to my portfolio
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Hi, I'm <span className="text-gradient">Irfan Rashid</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Senior Front End Developer & UI/UX Designer with 13+ Years Experience
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#projects" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="group relative w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                <Briefcase size={20} /> View Portfolio
                            </span>
                        </a>

                        <a href="#contact" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="group w-full sm:w-auto flex flex-row items-center justify-center px-8 py-4 text-base font-medium text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <Mail size={20} className="mr-2" /> Hire Me
                        </a>

                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300">
                            <Download size={20} className="mr-2" /> Download Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
