import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturedProjects = () => {
    const { t } = useTranslation();

    const featuredProjects = [
        {
            id: 1,
            title: t('featured.p1_title'),
            description: t('featured.p1_desc'),
            image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
            techStack: ["Shopify", "Liquid", "JavaScript", "Tailwind CSS"],
            category: "Shopify",
            liveDemoLink: "#",
            githubLink: "#",
        },
        {
            id: 2,
            title: t('featured.p2_title'),
            description: t('featured.p2_desc'),
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
            techStack: ["Angular", "TypeScript", "RxJS", "SCSS"],
            category: "Angular",
            liveDemoLink: "#",
            githubLink: "#",
        }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            {t('featured.title')} <span className="text-gradient">{t('featured.subtitle')}</span>
                        </motion.h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                            {t('featured.description')}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex gap-4 w-full justify-end">
                                        {project.liveDemoLink !== "#" && (
                                            <a href={project.liveDemoLink} className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark hover:scale-110 transition-all shadow-lg">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                        {project.githubLink !== "#" && (
                                            <a href={project.githubLink} className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-200 hover:scale-110 transition-all shadow-lg">
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                                <span className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">{project.category}</span>
                                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
