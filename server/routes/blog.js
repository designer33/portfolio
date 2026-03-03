const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// GET all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find({}).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET single blog post by slug
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST create blog post (Admin)
router.post('/', async (req, res) => {
    try {
        const post = new BlogPost(req.body);
        const created = await post.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: 'Invalid post data', error: error.message });
    }
});

// DELETE blog post (Admin)
router.delete('/:id', async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
