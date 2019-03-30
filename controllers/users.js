const Boom = require('boom');
const { User } = require('../models');

module.exports = {
    create(request, h) {
        return User
            .create({
                username: request.payload.username,
            })
            .then(user => h.response(user).code(201))
            .catch((error) => { throw Boom.badRequest(error); });
    },
};
