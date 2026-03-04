import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Briefcase, FileText, MessageSquare,
    LogOut, Plus, Trash2, X, Loader, CheckCircle, Globe,
    Github, Eye, AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

// ─── Overview Tab ─────────────────────────────────────────────
const OverviewTab = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
            { label: 'Total Projects', value: stats.projects, icon: <Briefcase size={24} />, color: 'bg-blue-500' },
            { label: 'Blog Posts', value: stats.blog, icon: <FileText size={24} />, color: 'bg-purple-500' },
            { label: 'New Messages', value: stats.messages, icon: <MessageSquare size={24} />, color: 'bg-green-500' },
        ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl flex items-center gap-4">
                <div className={`${s.color || 'bg-slate-500'} p-3 rounded-xl text-white`}>{s.icon}</div>
                <div>
                    <p className="text-3xl font-extrabold">{s.value || 0}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{s.label}</p>
                </div>
            </motion.div>
        ))}
        <div className="sm:col-span-3 glass p-6 rounded-2xl">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Use the sidebar to manage your projects, read incoming messages, and update blog posts.</p>
        </div>
    </div>
);

// ─── Add Project Modal ─────────────────────────────────────────
const AddProjectModal = ({ onClose, onSave }) => {
    const [form, setForm] = useState({ title: '', description: '', image: '', techStack: '', liveLink: '', githubLink: '', category: 'Frontend Projects' });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = React.useRef();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setUploadError('');
        try {
            const formData = new FormData();
            formData.append('image', file);
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setForm(prev => ({ ...prev, image: data.url }));
        } catch (err) {
            const msg = err.response?.data?.message;
            setUploadError(msg || 'Upload failed. Please check the server is running.');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setErrorMsg('');
        try {
            // Fix techStack and field name mismatch
            const dataToSave = {
                ...form,
                techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
                liveDemoLink: form.liveLink // Map liveLink to model field liveDemoLink
            };
            delete dataToSave.liveLink;

            await onSave(dataToSave);
            onClose();
        } catch (err) {
            console.error('Save error:', err);
            setErrorMsg(err.response?.data?.message || 'Failed to save project. Please try again.');
            setSaving(false);
        }
    };

    const categories = ['WordPress', 'Shopify', 'Angular', 'Frontend Projects', 'UI/UX Design'];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Add New Project</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                    {/* Image Upload */}
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Project Image *</label>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className={`w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                                ${form.image ? 'border-primary/50' : 'border-slate-300 dark:border-slate-600 hover:border-primary'}`}
                            style={form.image ? { backgroundImage: `url(${form.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                        >
                            {uploading ? (
                                <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 flex flex-col items-center gap-2">
                                    <Loader size={28} className="animate-spin text-primary" />
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Uploading...</span>
                                </div>
                            ) : form.image ? (
                                <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl px-4 py-2 text-sm font-medium text-primary flex items-center gap-2">
                                    <CheckCircle size={16} /> Image uploaded · Click to change
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                        <Plus size={22} className="text-slate-400" />
                                    </div>
                                    <span className="text-sm">Click to upload image</span>
                                    <span className="text-xs text-slate-400">PNG, JPG, WebP up to 5MB</span>
                                </div>
                            )}
                        </div>
                        {uploadError && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{uploadError}</p>}
                    </div>

                    {[
                        { label: 'Project Title *', key: 'title', placeholder: 'E-Commerce Replatforming' },
                        { label: 'Tech Stack (comma-separated)', key: 'techStack', placeholder: 'React, Tailwind, Node.js' },
                        { label: 'Live Demo URL', key: 'liveLink', placeholder: 'https://...' },
                        { label: 'GitHub URL', key: 'githubLink', placeholder: 'https://github.com/...' },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">{label}</label>
                            <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                        </div>
                    ))}
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Description *</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                            placeholder="Brief description of the project..."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                            {Array.isArray(categories) ? categories.map(c => <option key={c}>{c}</option>) : null}
                        </select>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                    <button onClick={handleSave} disabled={saving || uploading || !form.title || !form.description || !form.image}
                        className="flex-1 py-3 bg-primary text-white rounded-xl text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                        {saving ? <><Loader size={16} className="animate-spin" /> Saving...</> : <><Plus size={16} /> Add Project</>}
                    </button>
                </div>
                {errorMsg && <p className="text-red-500 text-xs mt-3 flex items-center gap-1"><AlertCircle size={14} />{errorMsg}</p>}
            </motion.div>
        </div>
    );
};

// ─── Add Blog Modal ───────────────────────────────────────────
const AddBlogModal = ({ onClose, onSave }) => {
    const [form, setForm] = useState({ title: '', excerpt: '', content: '', coverImage: '', tags: '', isPublished: true });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = React.useRef();

    const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const { data } = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setForm(prev => ({ ...prev, coverImage: data.url }));
        } catch { setErrorMsg('Image upload failed'); }
        finally { setUploading(false); }
    };

    const handleSave = async () => {
        setSaving(true);
        setErrorMsg('');
        try {
            const dataToSave = {
                ...form,
                slug: generateSlug(form.title),
                tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
                // Hardcoded author for now or get from context - making it dummy ID if needed
                author: '65e4ba8c1a2b3c4d5e6f7a8b'
            };
            await onSave(dataToSave);
            onClose();
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to save post');
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">New Blog Post</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1">Cover Image</label>
                        <input ref={fileInputRef} type="file" onChange={handleImageUpload} className="hidden" />
                        <div onClick={() => fileInputRef.current.click()} className="w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden border-slate-300">
                            {uploading ? <Loader size={20} className="animate-spin" /> :
                                form.coverImage ? <img src={form.coverImage} className="w-full h-full object-cover" /> :
                                    <span className="text-sm text-slate-400">Click to upload cover image</span>}
                        </div>
                    </div>
                    <input placeholder="Post Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-900 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary outline-none" />
                    <input placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-900 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary outline-none" />
                    <textarea placeholder="Excerpt (brief summary)" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-900 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary outline-none" />
                    <textarea placeholder="Content (Markdown supported)" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} className="w-full px-4 py-2.5 rounded-xl border dark:bg-slate-900 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 border rounded-xl hover:bg-slate-50">Cancel</button>
                    <button onClick={handleSave} disabled={saving || !form.title || !form.content} className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50">
                        {saving ? 'Saving...' : 'Publish Post'}
                    </button>
                </div>
                {errorMsg && <p className="text-red-500 text-xs mt-3">{errorMsg}</p>}
            </motion.div>
        </div>
    );
};

// ─── Projects Tab ─────────────────────────────────────────────
const ProjectsTab = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/projects');
            setProjects(Array.isArray(data) ? data : []);
        }
        catch { } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const handleAdd = async (projectData) => {
        await api.post('/projects', projectData);
        fetchProjects();
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try { await api.delete(`/projects/${id}`); setProjects(p => p.filter(x => x._id !== id)); }
        catch { } finally { setDeletingId(null); }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[40vh]"><Loader size={32} className="animate-spin text-primary" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-slate-500 dark:text-slate-400 text-sm">{projects.length} projects</p>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
                    <Plus size={18} /> Add Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="glass rounded-2xl p-16 text-center text-slate-500">
                    <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-medium">No projects yet. Click "Add Project" to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map(p => (
                        <motion.div key={p._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="glass rounded-2xl overflow-hidden group">
                            <div className="relative h-44 overflow-hidden bg-slate-200 dark:bg-slate-700">
                                {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{p.category}</span>
                                <h4 className="font-bold text-lg mt-1 mb-2">{p.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {Array.isArray(p.techStack) ? p.techStack.map((t, i) => <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">{t}</span>) : null}
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex gap-3">
                                        {p.liveLink && <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Globe size={18} /></a>}
                                        {p.githubLink && <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Github size={18} /></a>}
                                    </div>
                                    <button onClick={() => handleDelete(p._id)} disabled={deletingId === p._id}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                                        {deletingId === p._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            <AnimatePresence>{showModal && <AddProjectModal onClose={() => setShowModal(false)} onSave={handleAdd} />}</AnimatePresence>
        </div>
    );
};

// ─── Messages Tab ─────────────────────────────────────────────
const MessagesTab = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        (async () => {
            try { const { data } = await api.get('/messages'); setMessages(data); }
            catch { } finally { setLoading(false); }
        })();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await api.delete(`/messages/${id}`);
            setMessages(m => m.filter(x => x._id !== id));
            if (selected?._id === id) setSelected(null);
        } catch { } finally { setDeletingId(null); }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[40vh]"><Loader size={32} className="animate-spin text-primary" /></div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Message List */}
            <div className="space-y-3">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{messages.length} message{messages.length !== 1 ? 's' : ''}</p>
                {Array.isArray(messages) && messages.length === 0 ? (
                    <div className="glass rounded-2xl p-12 text-center text-slate-500">
                        <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                        <p>No messages yet.</p>
                    </div>
                ) : Array.isArray(messages) ? messages.map(m => (
                    <motion.div key={m._id} layout onClick={() => setSelected(m)}
                        className={`glass p-4 rounded-xl cursor-pointer transition-all border-2 ${selected?._id === m._id ? 'border-primary' : 'border-transparent hover:border-primary/30'}`}>
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-sm">{m.name}</h4>
                            <span className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-primary mb-1">{m.email}</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{m.subject}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.message}</p>
                    </motion.div>
                )) : null}
            </div>

            {/* Message Detail */}
            <div className="glass rounded-2xl p-6 h-fit sticky top-24">
                {selected ? (
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{selected.name}</h3>
                                <a href={`mailto:${selected.email}`} className="text-primary text-sm hover:underline">{selected.email}</a>
                            </div>
                            <button onClick={() => handleDelete(selected._id)} disabled={deletingId === selected._id}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                                {deletingId === selected._id ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            </button>
                        </div>
                        <p className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-lg inline-block mb-4">{selected.subject}</p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selected.message}</p>
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-sm hover:bg-primary-dark transition-colors">
                                Reply via Email
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-12">
                        <Eye size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Blog Tab ─────────────────────────────
const BlogTab = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try { const { data } = await api.get('/blog'); setPosts(data); }
        catch { } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const handleAdd = async (postData) => {
        await api.post('/blog', postData);
        fetchPosts();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        setDeletingId(id);
        try { await api.delete(`/blog/${id}`); setPosts(p => p.filter(x => x._id !== id)); }
        catch { } finally { setDeletingId(null); }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[40vh]"><Loader size={32} className="animate-spin text-primary" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <p className="text-slate-500 dark:text-slate-400 text-sm">{posts.length} posts</p>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
                    <Plus size={18} /> Add Post
                </button>
            </div>
            {Array.isArray(posts) && posts.length === 0 ? (
                <div className="glass rounded-2xl p-16 text-center text-slate-500">
                    <FileText size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-medium">No blog posts yet.</p>
                </div>
            ) : Array.isArray(posts) ? posts.map(p => (
                <div key={p._id} className="glass p-5 rounded-2xl mb-4 flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden">
                            {p.coverImage && <img src={p.coverImage} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                            <h4 className="font-bold">{p.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {p.isPublished ? 'Published' : 'Draft'}
                                </span>
                                <span className="text-[10px] text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleDelete(p._id)} disabled={deletingId === p._id}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        {deletingId === p._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                </div>
            )) : null}
            <AnimatePresence>{showModal && <AddBlogModal onClose={() => setShowModal(false)} onSave={handleAdd} />}</AnimatePresence>
        </div>
    );
};

// ─── Main Dashboard ────────────────────────────────────────────
const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [stats, setStats] = useState({ projects: 0, blog: 0, messages: 0 });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) { navigate('/admin/login'); return; }

        // Fetch stats for Overview
        Promise.all([api.get('/projects'), api.get('/blog'), api.get('/messages')])
            .then(([p, b, m]) => {
                const projectsCount = Array.isArray(p.data) ? p.data.length : 0;
                const blogCount = Array.isArray(b.data) ? b.data.length : 0;
                const messagesCount = Array.isArray(m.data) ? m.data.length : 0;
                setStats({ projects: projectsCount, blog: blogCount, messages: messagesCount });
            })
            .catch(() => { });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
    };

    const tabs = [
        { name: 'Overview', icon: <LayoutDashboard size={20} /> },
        { name: 'Projects', icon: <Briefcase size={20} /> },
        { name: 'Blog Posts', icon: <FileText size={20} /> },
        { name: 'Messages', icon: <MessageSquare size={20} /> },
    ];

    const renderTab = () => {
        switch (activeTab) {
            case 'Overview': return <OverviewTab stats={stats} />;
            case 'Projects': return <ProjectsTab />;
            case 'Blog Posts': return <BlogTab />;
            case 'Messages': return <MessagesTab />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 absolute top-0 left-0 w-full z-50">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-screen fixed">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-gradient">ADMIN</span> Panel
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">{localStorage.getItem('adminEmail') || 'admin@irfan.com'}</p>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
                    {Array.isArray(tabs) ? tabs.map((tab) => (
                        <button key={tab.name} onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === tab.name
                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
                            {tab.icon}
                            <span className="font-medium">{tab.name}</span>
                            {tab.name === 'Messages' && stats.messages > 0 && (
                                <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{stats.messages}</span>
                            )}
                        </button>
                    )) : null}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <button onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium text-sm">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 flex-1 p-8 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">{activeTab}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                        {activeTab === 'Overview' && 'Welcome to your portfolio admin panel.'}
                        {activeTab === 'Projects' && 'Add, view, and remove your portfolio projects.'}
                        {activeTab === 'Messages' && 'View and manage contact form submissions.'}
                        {activeTab === 'Blog Posts' && 'Manage your blog post entries.'}
                    </p>
                </div>

                <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {renderTab()}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
