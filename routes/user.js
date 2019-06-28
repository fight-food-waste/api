const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// Map routes to controller
router.get('/user', userController.findSelf);
router.get('/user/:id', userController.findOne);

module.exports = router;
