const { User } = require('../models');

module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    findAll(req, res) {
        return User
            .findAll()
            .then(users => res.status(201).send(users))
            .catch(error => res.status(400).send(error));
    },
};
