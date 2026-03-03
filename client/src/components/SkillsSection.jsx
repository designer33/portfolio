import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { name: "HTML5", level: 95 },
            { name: "CSS3 / Tailwind", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "React", level: 80 },
            { name: "Angular", level: 75 },
            { name: "Shopify Liquid", level: 85 },
        ]
    },
    {
        title: "CMS & E-Commerce",
        skills: [
            { name: "WordPress", level: 95 },
            { name: "WooCommerce", level: 90 },
            { name: "Shopify", level: 85 },
        ]
    },
    {
        title: "Design",
        skills: [
            { name: "UI/UX Design", level: 85 },
            { name: "Figma", level: 90 },
            { name: "Adobe Illustrator", level: 75 },
            { name: "Wireframing", level: 85 },
        ]
    },
    {
        title: "Tools & Others",
        skills: [
            { name: "Git & GitHub", level: 85 },
            { name: "Browser Dev Tools", level: 95 },
            { name: "Responsive Design", level: 95 },
            { name: "Cross-Browser Testing", level: 90 },
        ]
    }
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        My <span className="text-gradient">Skills</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Tools, technologies, and practices I use to build performant web applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="glass p-8 rounded-2xl"
                        >
                            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                                {category.title}
                            </h3>
                            <div className="space-y-6">
                                {category.skills.map((skill, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                                            <span className="text-sm font-medium text-primary">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                                                className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
