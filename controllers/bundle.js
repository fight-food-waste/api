const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const bundleController = {
  create(req, res) {
    knex('bundles')
      .insert({
        donor_id: 1, // TODO: get donor id from token
        submitted_at: new Date(),
      })
      .then((id) => {
        const bundleId = id[0];
        res.send({ id: bundleId });
      })
      .catch((error) => {
        console.log(`${error}`);

        res.sendStatus(500);
      });
  },
  findOne(req, res) {
    const bundleId = req.params.id;

    const schema = Joi.object()
      .keys({
        bundle_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ bundle_id: bundleId }, schema, (err, value) => {
      if (err !== null) {
        console.log(`Failed to validate bundle: ${err}`);
        res.sendStatus(400);
      } else {
        knex.select()
          .table('bundles')
          .where('id', value.bundle_id)
          .then((rows) => {
            const bundle = rows[0];
            res.json(bundle);
          })
          .catch((error) => {
            console.log(`Failed to query for bundle: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findFromDonor(req, res) {
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
        console.log(`Failed to validate donorx: ${err}`);
      } else {
        knex.select()
          .table('bundles')
          .where('donor_id', value.donor_id)
          .then((rows) => {
            res.json(rows);
          })
          .catch((error) => {
            console.log(`Failed to query for bundles: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
};

module.exports = bundleController;
