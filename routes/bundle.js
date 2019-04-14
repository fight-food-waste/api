const express = require('express');
const bundleController = require('../controllers/bundle');

const router = express.Router();

// Map routes to controller
router.post('/', bundleController.create);
router.get('/:id', bundleController.findOne);
router.get('/donor/:id', bundleController.findFromDonor)

module.exports = router;
