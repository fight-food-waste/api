const Joi = require('joi');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));
const token = require('../utils/token');

const authController = {
  auth(req, res) {
    const schema = Joi.object()
      .keys({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .required()
          .min(8),
      });

    Joi.validate({
      email: req.body.email,
      password: req.body.password,
    }, schema, (err, value) => {
      if (err !== null) {
        console.log(`Failed auth: ${err}`);
        res.sendStatus(400);
      } else {
        knex.select('password', 'id')
          .table('users')
          .where('email', value.email)
          .then((rows) => {
            if (rows.length === 0) {
              res.sendStatus(400);
            } else {
              const user = rows[0];
              const hashedPassword = user.password.replace('$2y$', '$2a$');
              const receivedPassword = value.password;

              bcrypt.compare(receivedPassword, hashedPassword)
                .then((passwordIsValid) => {
                  if (passwordIsValid) {
                    const userToken = token.generate();

                    knex('user_tokens')
                      .insert({
                        user_id: user.id,
                        token: userToken,
                        date: new Date(),
                      })
                      .then(() => {
                        res.send({ token: userToken });
                      })
                      .catch((error) => {
                        console.log(error);

                        res.sendStatus(500);
                      });
                  } else {
                    res.sendStatus(403);
                  }
                });
            }
          })
          .catch((error) => {
            console.log(error);

            res.sendStatus(500);
          });
      }
    });
  },
};

module.exports = authController;
