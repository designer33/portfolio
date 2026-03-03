const express = require('express');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify Admin JWT
const protectAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalid' });
    }
};

// GET all projects (public)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new project (admin)
router.post('/', protectAdmin, async (req, res) => {
    try {
        const project = new Project(req.body);
        const created = await project.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: 'Invalid project data', error: error.message });
    }
});

// PUT update a project (admin)
router.put('/:id', protectAdmin, async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a project (admin)
router.delete('/:id', protectAdmin, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
