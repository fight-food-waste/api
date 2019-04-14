const knex = require('knex')(require('../knexfile'));

const bundleController = {
  create(req, res) {
    knex('bundles')
      .insert({
        donor_id: 1,
        submitted_at: new Date(),
      })
      .then((id) => {
        res.send({ id: id[0] });
      })
      .catch((error) => {
        console.log(`${error}`);

        res.sendStatus(500);
      });
  },
  findOne(req, res) {
    const bundleId = req.params.id;

    knex.select().table('bundles').where('id', bundleId)
      .then((rows) => {
        const bundle = rows[0];
        res.json(bundle);
      })
      .catch((error) => {
        console.log(`Failed to query for bundle: ${error}`);

        res.sendStatus(500);
      });
  },
};

module.exports = bundleController;
