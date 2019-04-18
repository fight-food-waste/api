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
          .table('donors')
          .where('email', value.email)
          .then((rows) => {
            const donor = rows[0];
            const hashedPassword = donor.password;
            const receivedPassword = value.password;

            bcrypt.compare(receivedPassword, hashedPassword)
              .then((passwordIsValid) => {
                if (passwordIsValid) {
                  const userToken = token.generate();

                  knex('user_tokens')
                    .insert({
                      user_id: donor.id,
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
