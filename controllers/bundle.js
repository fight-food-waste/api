const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const bundleController = {
  create(req, res) {
    knex('bundles')
      .insert({
        donor_id: req.donor_id,
        submitted_at: new Date(),
      })
      .then((id) => {
        // Return the created bundle's id
        res.send({ id: id[0] });
      })
      .catch((error) => {
        console.log(`${error}`);

        res.sendStatus(500);
      });
  },
  findOne(req, res) {
    const schema = Joi.object()
      .keys({
        bundle_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ bundle_id: req.params.id }, schema, (err, value) => {
      if (err !== null) {
        console.log(`Failed to validate bundle: ${err}`);
        res.sendStatus(400);
      } else {
        knex.select()
          .table('bundles')
          .where('id', value.bundle_id)
          .where('donor_id', req.donor_id)
          .then((rows) => {
            if (rows.length === 0) {
              // Bundle does not exist or is another donor's
              res.sendStatus(404);
            } else {
              const bundle = rows[0];
              res.json(bundle);
            }
          })
          .catch((error) => {
            console.log(`Failed to query for bundle: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findFromDonor(req, res) {
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
      } else if (value.donor_id !== req.donor_id) {
        // Can't get another donor's bundles
        res.sendStatus(403);
      } else {
        knex.select()
          .table('bundles')
          .where('donor_id', value.donor_id)
          .then((rows) => {
            // Send bundle(s) as JSON
            res.json(rows);
          })
          .catch((error) => {
            console.log(`Failed to query for bundles: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  close(req, res) {
    knex('bundles')
      .where('id', '=', 2)
      .update({
        status: 'closed',
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(`${error}`);

        res.sendStatus(500);
      });
  },
};

module.exports = bundleController;
