const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// POST a new contact message
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const newMessage = new Message({ name, email, subject, message });
        const saved = await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully!', data: saved });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// GET all messages (Admin)
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a message (Admin)
router.delete('/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
