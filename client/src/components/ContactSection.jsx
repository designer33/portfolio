import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';

const ContactSection = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await api.post('/messages', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 relative bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {t('contact.title')} <span className="text-gradient">{t('contact.subtitle')}</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('contact.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-2xl flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">{t('contact.email_me')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">info@irfanrashid.com</p>
                                <a href="mailto:info@irfanrashid.com" className="text-primary hover:underline text-sm font-medium">{t('contact.send_email')}</a>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-2xl flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">{t('contact.call_me')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">+92 343 848 5818</p>
                                <a href="tel:+923438485818" className="text-primary hover:underline text-sm font-medium">{t('contact.place_call')}</a>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-2xl flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">{t('contact.location')}</h3>
                                <p className="text-slate-600 dark:text-slate-400">Rawalpindi, Pakistan</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass p-8 rounded-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contact.name_label')}</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder={t('contact.name_placeholder')}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contact.email_label')}</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder={t('contact.email_placeholder')}
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contact.subject_label')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder={t('contact.subject_placeholder')}
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contact.message_label')}</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    placeholder={t('contact.message_placeholder')}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full group flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <><Loader size={20} className="mr-2 animate-spin" /> {t('contact.sending')}</>
                                ) : (
                                    <><Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform" /> {t('contact.send')}</>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="flex items-center gap-2 text-green-500 justify-center font-medium text-sm">
                                    <CheckCircle size={18} /> {t('contact.success')}
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-500 justify-center font-medium text-sm">
                                    <AlertCircle size={18} /> {t('contact.error')}
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
