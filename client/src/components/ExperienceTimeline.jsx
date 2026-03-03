import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
    { role: "Web Designer", company: "DevioTech", period: "Apr 2024 – Present", desc: "Leading the design system and front-end architecture for enterprise clients." },
    { role: "Shopify & WordPress Developer", company: "Twisted Minds", period: "2023 – 2024", desc: "Developed highly customized e-commerce solutions increasing client sales by 40%." },
    { role: "Angular Developer", company: "Magnatec Systems", period: "2021 – 2023", desc: "Built scalable enterprise dashboards and interactive single-page applications." },
    { role: "Front End Developer", company: "Smart Insider", period: "2020 – 2021", desc: "Implemented responsive UI/UX designs and complex data visualizations." },
    { role: "WordPress Developer", company: "Celeste Miranda & Associates", period: "2019 – 2020", desc: "Custom theme development and performance optimization for publisher platforms." },
    { role: "Senior Frontend Developer", company: "Purch", period: "2016 – 2018", desc: "Spearheaded the front-end modernization of high-traffic content sites." },
    { role: "Front End Developer", company: "Cancer IQ", period: "2014 – 2016", desc: "Developed secure and accessible healthcare interfaces." },
    { role: "Front End Developer", company: "FretBay", period: "2012 – 2014", desc: "Started career building dynamic web platforms for logistics." },
];

const ExperienceTimeline = () => {
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
                        My <span className="text-gradient">Experience</span>
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
