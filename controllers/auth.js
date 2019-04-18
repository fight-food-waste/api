const Joi = require('joi');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));

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
        knex.select('password')
          .table('donors')
          .where('email', value.email)
          .then((rows) => {
            const donor = rows[0];
            const hashedPassword = donor.password;
            const receivedPassword = value.password;

            // TODO: Create and send token

            bcrypt.compare(receivedPassword, hashedPassword)
              .then((passwordIsValid) => {
                if (passwordIsValid) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(400);
                }
              });
          })
          .catch((error) => {
            console.log(`${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
};

module.exports = authController;
