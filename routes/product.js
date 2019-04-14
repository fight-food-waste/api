const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

// Map routes to controller
router.post('/', productController.create);
router.get('/:id', productController.findOne);
router.get('/bundle/:id', productController.findFromBundle);

module.exports = router;
