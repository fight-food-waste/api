const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

// POST /users
router.post('/', usersController.create);

module.exports = router;
