import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ExperienceTimeline = () => {
    const { t } = useTranslation();

    const experiences = [
        { role: t('experience.exp1_role'), company: t('experience.exp1_company'), period: "Apr 2024 – Present", desc: t('experience.exp1_desc') },
        { role: t('experience.exp2_role'), company: t('experience.exp2_company'), period: "2023 – 2024", desc: t('experience.exp2_desc') },
        { role: t('experience.exp3_role'), company: t('experience.exp3_company'), period: "2021 – 2023", desc: t('experience.exp3_desc') },
        { role: t('experience.exp4_role'), company: t('experience.exp4_company'), period: "2020 – 2021", desc: t('experience.exp4_desc') },
        { role: t('experience.exp5_role'), company: t('experience.exp5_company'), period: "2019 – 2020", desc: t('experience.exp5_desc') },
        { role: t('experience.exp6_role'), company: t('experience.exp6_company'), period: "2016 – 2018", desc: t('experience.exp6_desc') },
        { role: t('experience.exp7_role'), company: t('experience.exp7_company'), period: "2014 – 2016", desc: t('experience.exp7_desc') },
        { role: t('experience.exp8_role'), company: t('experience.exp8_company'), period: "2012 – 2014", desc: t('experience.exp8_desc') },
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {t('experience.title')} <span className="text-gradient">{t('experience.subtitle')}</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Vertical line: left aligned on mobile, centered on desktop */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-primary/30 z-0"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex items-center justify-between w-full md:w-auto ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                                    }`}
                            >
                                {/* Timeline dot: left aligned on mobile, centered on desktop */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-slate-900 z-10"></div>

                                {/* Empty space for alternating layout on desktop */}
                                <div className="hidden md:block w-5/12"></div>

                                {/* Content Box */}
                                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                                    <div className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                                        <div className="flex items-center gap-2 mb-3 text-primary bg-primary/10 inline-flex px-3 py-1 rounded-full w-fit">
                                            <Briefcase size={14} />
                                            <span className="text-xs font-bold tracking-wide">{exp.period}</span>
                                        </div>
                                        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-1">{exp.role}</h3>
                                        <h4 className="text-md font-semibold text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm text-left">
                                            {exp.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
