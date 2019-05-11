const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const donorController = {
  findOne(req, res) {
    const schema = Joi.object()
      .keys({
        donor_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ donor_id: req.params.id }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate donor: ${err}`);
      } else if (req.donor_id !== value.donor_id) {
        // Can't get another donor's info
        res.sendStatus(403);
      } else {
        knex.select()
          .table('donors')
          .where('id', value.donor_id)
          .then((rows) => {
            const donor = rows[0];
            res.json(donor);
          })
          .catch((error) => {
            console.log(`Failed to query for donor: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findSelf(req, res) {
    knex.select()
      .table('donors')
      .where('id', req.donor_id) // self id
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
