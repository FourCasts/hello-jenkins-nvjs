const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');

router.get('/', helloController.sayHello);

module.exports = router;
