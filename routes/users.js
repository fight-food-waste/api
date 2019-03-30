const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

// POST /users
router.post('/', usersController.create);
// GET /users
router.get('/', usersController.findAll);

module.exports = router;
