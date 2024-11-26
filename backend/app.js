const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Import routes
const routes = require('./routes');
app.use('/api', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
