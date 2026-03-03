const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        company: { type: String },
        content: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        avatar: { type: String },
        featured: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
