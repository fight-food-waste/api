const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));
const token = require('../utils/token');

const donorController = {
  findOne(req, res) {
    knex.select()
      .table('user_tokens')
      .where('token', req.header('token'))
      .then((tokens) => {
        const donorId = tokens[0].user_id;
        console.log(donorId);

        const requestedDonorId = req.params.id;

        const schema = Joi.object()
          .keys({
            donor_id: Joi.number()
              .integer()
              .required()
              .valid(donorId),
          });

        Joi.validate({ donor_id: requestedDonorId }, schema, (err, value) => {
          if (err !== null) {
            res.sendStatus(400);
            console.log(`Failed to validate donor: ${err}`);
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
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(403);
      });


  },
};

module.exports = donorController;
