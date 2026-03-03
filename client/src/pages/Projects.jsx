import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const categories = ['All', 'WordPress', 'Shopify', 'Angular', 'UI/UX Design', 'Frontend Projects'];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/projects');
                setProjects(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <div id="projects" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    My <span className="text-gradient">Portfolio</span>
                </motion.h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    A selection of my recent works. These projects demonstrate my expertise in building robust, performant web applications.
                </p>
            </div>

            {/* Filter Categories */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
            >
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader size={40} className="animate-spin text-primary mb-4" />
                    <p className="text-slate-500 animate-pulse">Loading projects...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl border-red-100 dark:border-red-900/30">
                    <AlertCircle size={40} className="text-red-500 mb-4" />
                    <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-20 glass rounded-2xl">
                    <p className="text-slate-500">No projects found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {project.liveDemoLink && (
                                        <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark hover:scale-110 transition-all">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-200 hover:scale-110 transition-all">
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{project.category}</span>
                                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack?.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
