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
};

module.exports = bundleController;
