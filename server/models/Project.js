const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        techStack: [{ type: String }],
        liveDemoLink: { type: String },
        githubLink: { type: String },
        category: {
            type: String,
            enum: ['WordPress', 'Shopify', 'Angular', 'UI/UX Design', 'Frontend Projects'],
            required: true
        },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
