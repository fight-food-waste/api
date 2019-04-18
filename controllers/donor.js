const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const donorController = {
  findOne(req, res) {
    const donorId = req.params.id;

    const schema = Joi.object()
      .keys({
        donor_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ donor_id: donorId }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate donor: ${err}`);
        return;
      }

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
    });
  },
};

module.exports = donorController;
