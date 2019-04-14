const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));

const authController = {
  auth(req, res) {
    knex.select('password').table('donors').where('email', req.body.email)
      .then((rows) => {
        const donor = rows[0];
        const sentPassword = req.body.password;
        const hashedPassword = donor.password;

        bcrypt.compare(sentPassword, hashedPassword).then((passwordIsValid) => {
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
  },
};

module.exports = authController;
