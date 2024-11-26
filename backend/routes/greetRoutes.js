const express = require('express');
const router = express.Router();
const greetController = require('../controllers/greetController');

router.get('/', greetController.greet);

module.exports = router;
