const Joi = require('joi');
const usersController = require('../controllers').users;

module.exports = [
    {
        method: 'GET',
        path: '/user/{name}',
        handler: request => `Hello, ${encodeURIComponent(request.params.name)}!`,
    },
    {
        method: 'POST',
        path: '/users',
        handler: usersController.create,
        config: {
            validate: {
                payload: {
                    username: Joi.string().min(3).max(10).required(),
                },
            },
        },
    },
];
