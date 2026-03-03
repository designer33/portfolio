import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const dummyPosts = [
    {
        id: 1,
        title: "Understanding React Server Components in Next.js 14",
        excerpt: "A deep dive into how Server Components work under the hood and when to use them versus Client Components.",
        date: "Oct 15, 2024",
        author: "Irfan Rashid",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        category: "React"
    },
    {
        id: 2,
        title: "Optimizing Web Vitals for E-Commerce Sites",
        excerpt: "Learn the strategies that helped us increase our Shopify store's conversion rate by fixing CLS and LCP issues.",
        date: "Sep 22, 2024",
        author: "Irfan Rashid",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        category: "Performance"
    },
    {
        id: 3,
        title: "The Future of CSS: Container Queries & has()",
        excerpt: "Explore the new CSS features that are revolutionizing how we write responsive and dynamic stylesheets.",
        date: "Aug 05, 2024",
        author: "Irfan Rashid",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
        category: "CSS"
    }
];

const Blog = () => {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    My <span className="text-gradient">Blog</span>
                </motion.h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Thoughts, technical tutorials, and insights from over a decade of front-end development.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="glass rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                {post.category}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                                {post.excerpt}
                            </p>

                            <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors mt-auto">
                                Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
