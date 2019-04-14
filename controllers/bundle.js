const knex = require('knex')(require('../knexfile'));

const bundleController = {
  create(req, res) {
    knex('bundles')
      .insert({})
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
