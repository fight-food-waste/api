const express = require('express');
const bundleController = require('../controllers/bundle');

const router = express.Router();

// Map routes to controller
router.post('/', bundleController.create);

module.exports = router;