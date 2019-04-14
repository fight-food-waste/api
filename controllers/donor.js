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
};

module.exports = donorController;
