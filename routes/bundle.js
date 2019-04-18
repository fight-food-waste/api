const express = require('express');
const bundleController = require('../controllers/bundle');

const router = express.Router();

// Map routes to controller
router.post('/bundle', bundleController.create);
router.get('/bundle/:id', bundleController.findOne);
router.get('/bundle/donor/:id', bundleController.findFromDonor);

module.exports = router;
