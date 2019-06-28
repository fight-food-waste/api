const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const productController = {
  create(req, res) {
    const schema = Joi.object()
      .keys({
        name: Joi.string()
          .required(),
        barcode: Joi.number()
          .integer()
          .required(),
        quantity: Joi.number()
          .integer()
          .required(),
        bundle_id: Joi.number()
          .integer()
          .required(),
        expiration_date: Joi.date()
          .required(),
      });

    Joi.validate({
      name: req.body.name,
      barcode: req.body.barcode,
      quantity: req.body.quantity,
      bundle_id: req.body.bundle_id,
      expiration_date: req.body.expiration_date,
    }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate product: ${err}`);
      } else {
        // Make sure the user does not insert the product in any bundle
        knex.select()
          .table('bundles')
          .where('id', value.bundle_id)
          .where('user_id', req.user_id)
          .then((rows) => {
            if (rows.length === 0) {
              // Bundle does not exist or is another user's
              res.sendStatus(400);
            } else if (rows[0].status === 'closed') {
              res.status(400)
                .json({ error: 'Bundle is closed.' });
            } else {
              knex('products_scanned')
                .insert({
                  name: value.name,
                  barcode: value.barcode,
                  quantity: value.quantity,
                  bundle_id: value.bundle_id,
                  expiration_date: value.expiration_date,
                  status: 0,
                })
                .then((id) => {
                  // Return the insert product's id
                  res.send({ id: id[0] });
                })
                .catch((error) => {
                  console.log(`${error}`);

                  res.sendStatus(500);
                });
            }
          })
          .catch((error) => {
            console.log(`Failed to query for bundle: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findOne(req, res) {
    const productId = req.params.id;

    const schema = Joi.object()
      .keys({
        product_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ product_id: productId }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate user: ${err}`);
      } else {
        knex.select()
          .table('products_scanned')
          .where('id', value.product_id)
          .then((products) => {
            if (products.length === 0) {
              // product does not exist
              res.sendStatus(404);
            } else {
              const product = products[0];
              knex.select()
                .table('bundles')
                .where('id', product.bundle_id)
                .where('user_id', req.user_id)
                .then((bundles) => {
                  const bundle = bundles[0];
                  if (bundle.user_id !== req.user_id) {
                    // Product is part of a bundle that belongs to another user
                    res.sendStatus(403);
                  } else {
                    res.json(product);
                  }
                })
                .catch((error) => {
                  console.log(`Failed to query for bundle: ${error}`);

                  res.sendStatus(500);
                });
            }
          })
          .catch((error) => {
            console.log(`Failed to query for product: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findFromBundle(req, res) {
    const bundleId = req.params.id;

    const schema = Joi.object()
      .keys({
        bundle_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ bundle_id: bundleId }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate bundle: ${err}`);
      } else {
        knex.select()
          .table('bundles')
          .where('id', value.bundle_id)
          .where('user_id', req.user_id)
          .then((bundles) => {
            if (bundles.length === 0) {
              // Bundle does not exist or is another user's
              res.sendStatus(404);
            } else {
              knex.select()
                .table('products_scanned')
                .where('bundle_id', value.bundle_id)
                .then((products) => {
                  res.json(products);
                })
                .catch((error) => {
                  console.log(`Failed to query for products: ${error}`);

                  res.sendStatus(500);
                });
            }
          })
          .catch((error) => {
            console.log(`Failed to query for bundle: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findFromStock(req, res) {
    knex.select()
      .table('products_scanned')
      .where('status', 2) // 2 = in stock
      .then((products) => {
        if (products.length === 0) {
          res.sendStatus(404);
        } else {
          res.json(products);
        }
      })
      .catch((error) => {
        console.log(`Failed to query for products: ${error}`);

        res.sendStatus(500);
      });
  },
};

module.exports = productController;
