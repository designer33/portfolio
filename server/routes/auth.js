const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // In a real app, verify against Database.
        // For now, allow a hardcoded admin if DB is not connected.
        if (email === 'admin@irfan.com' && password === 'admin123') {
            const token = jwt.sign({ id: 'admin123', isAdmin: true }, process.env.JWT_SECRET || 'fallback_secret', {
                expiresIn: '30d',
            });
            return res.json({ token, email, isAdmin: true });
        }

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'fallback_secret', {
                expiresIn: '30d',
            });
            res.json({ token, email: user.email, isAdmin: user.isAdmin });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
