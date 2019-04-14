const knex = require('knex')(require('../knexfile'));

const productController = {
  create(req, res) {
    knex('products_scanned')
      .insert({
        details: req.body.details,
        quantity: req.body.quantity,
        bundle_id: req.body.bundle_id,
        expiration_date: req.body.expiration_date,
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
    const productId = req.params.id;

    knex.select().table('products_scanned').where('id', productId)
      .then((rows) => {
        const product = rows[0];
        res.json(product);
      })
      .catch((error) => {
        console.log(`Failed to query for product: ${error}`);

        res.sendStatus(500);
      });
  },
  findFromBundle(req, res) {
    const bundleId = req.params.id;

    knex.select().table('products_scanned').where('bundle_id', bundleId)
      .then((rows) => {
        res.json(rows);
      })
      .catch((error) => {
        console.log(`Failed to query for products: ${error}`);

        res.sendStatus(500);
      });
  },
};

module.exports = productController;
