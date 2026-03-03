const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
// These environment variables will be set in Vercel/Local .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file (buffer) to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer memoryStorage
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'portfolio_uploads',
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );

        uploadStream.end(fileBuffer);
    });
};

module.exports = { cloudinary, uploadToCloudinary };
