const express = require('express');

const router = express.Router();

// GET /
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the FFW API!',
    });
});

module.exports = router;
