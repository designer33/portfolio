import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';

const tagColors = {
    Shopify: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Frontend: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    WordPress: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const BlogSection = () => {
    const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/blog');
                setPosts(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                console.error("Error fetching blog posts:", err);
                setError(t('blog.failed'));
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [t]);

    return (
        <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {t('blog.title')} <span className="text-gradient">{t('blog.subtitle')}</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('blog.description')}
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader size={40} className="animate-spin text-primary mb-4" />
                        <p className="text-slate-500 animate-pulse">{t('blog.loading')}</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl border-red-100 dark:border-red-900/30">
                        <AlertCircle size={40} className="text-red-500 mb-4" />
                        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 glass rounded-2xl">
                        <p className="text-slate-500">{t('blog.no_posts')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => {
                            const postTag = post.tags?.[0] || 'General';
                            const readTime = Math.ceil((post.content?.split(' ').length || 0) / 200);

                            return (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        {post.coverImage && (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[postTag] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                <span className="flex items-center gap-1"><Tag size={10} />{postTag}</span>
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                <Clock size={12} /> {readTime} {t('blog.min_read')}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {post.excerpt || post.content?.substring(0, 150) + '...'}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                <Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                            <a href={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors group/link">
                                                {t('blog.read_more')}
                                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
