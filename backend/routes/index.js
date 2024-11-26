const express = require('express');
const router = express.Router();

// Import route modules
const helloRoutes = require('./helloRoutes');
const greetRoutes = require('./greetRoutes');

// Use routes
router.use('/hello', helloRoutes);
router.use('/greet', greetRoutes);

module.exports = router;
