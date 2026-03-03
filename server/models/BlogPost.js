const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true }, // Markdown supported
        excerpt: { type: String },
        coverImage: { type: String },
        categories: [{ type: String }],
        tags: [{ type: String }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPublished: { type: Boolean, default: false },
        publishedAt: { type: Date },
        seoDescription: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
