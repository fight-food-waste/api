const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));

const donorController = {
  findOne(req, res) {
    const donorId = req.params.id;

    knex.select().table('donors').where('id', donorId)
      .then((rows) => {
        const donor = rows[0];
        res.json(donor);
      })
      .catch((error) => {
        console.log(`Failed to query for donor: ${error}`);

        res.sendStatus(500);
      });
  },
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
        console.log(`Failed to verify password: ${error}`);

        res.sendStatus(500);
      });
  },
};

module.exports = donorController;
