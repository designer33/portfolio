import React from 'react';
import { motion } from 'framer-motion';
import { Download, Code2, PenTool, LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
    const { t } = useTranslation();
    const skills = [
        { title: t('about.skill1_title'), icon: <Code2 size={24} />, desc: t('about.skill1_desc') },
        { title: t('about.skill2_title'), icon: <PenTool size={24} />, desc: t('about.skill2_desc') },
        { title: t('about.skill3_title'), icon: <LayoutTemplate size={24} />, desc: t('about.skill3_desc') },
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
                        {t('about.title')} <span className="text-gradient">{t('about.subtitle')}</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('about.p1')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-semibold">{t('about.h3')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t('about.p2')}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t('about.p3')}
                        </p>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors duration-300">
                            <Download size={18} className="mr-2" /> {t('about.download_cv')}
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
