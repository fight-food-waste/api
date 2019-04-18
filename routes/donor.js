const express = require('express');
const donorController = require('../controllers/donor');

const router = express.Router();

// Map routes to controller
router.get('/donor/:id', donorController.findOne);

module.exports = router;
