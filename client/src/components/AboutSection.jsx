import React from 'react';
import { motion } from 'framer-motion';
import { Download, Code2, PenTool, LayoutTemplate } from 'lucide-react';

const AboutSection = () => {
    const skills = [
        { title: "Frontend Development", icon: <Code2 size={24} />, desc: "React, Next.js, Angular, Vue" },
        { title: "UI/UX Design", icon: <PenTool size={24} />, desc: "Figma, Adobe XD, Wireframing" },
        { title: "CMS Development", icon: <LayoutTemplate size={24} />, desc: "WordPress, Shopify, WooCommerce" },
    ];

    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        About <span className="text-gradient">Me</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        My professional journey, philosophy, and the skills I bring to the table.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-semibold">Crafting digital experiences for over a decade.</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            With 13+ years of experience in web development and UI/UX design, I have successfully delivered high-performance, scalable, and visually appealing web applications. My expertise spans across modern JavaScript frameworks, responsive design, and robust content management systems.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            I believe in writing clean, maintainable code and designing intuitive user interfaces that bridge the gap between complex functionality and user accessibility.
                        </p>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors duration-300">
                            <Download size={18} className="mr-2" /> Download CV
                        </a>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="glass p-6 rounded-2xl flex items-start gap-4 hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                    {skill.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">{skill.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{skill.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
