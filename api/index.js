// Vercel Serverless Function entry point
// This re-exports the Express app so Vercel can handle all /api/* requests.
const app = require('../server/server');

module.exports = app;
