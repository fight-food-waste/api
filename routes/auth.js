const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Map routes to controller
router.post('/auth', authController.auth);

module.exports = router;
