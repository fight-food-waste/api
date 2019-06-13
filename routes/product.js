const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

// Map routes to controller
router.post('/product', productController.create);
router.get('/product/:id', productController.findOne);
router.get('/product/bundle/:id', productController.findFromBundle);
router.get('/products/in-stock', productController.findFromStock);

module.exports = router;
