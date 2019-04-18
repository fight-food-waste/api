const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const productController = {
  create(req, res) {
    const schema = Joi.object()
      .keys({
        details: Joi.string()
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
      details: req.body.details,
      quantity: req.body.quantity,
      bundle_id: req.body.bundle_id,
      expiration_date: req.body.expiration_date,
    }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate bundle: ${err}`);
        return;
      }

      knex('products_scanned')
        .insert({
          details: value.details,
          quantity: value.quantity,
          bundle_id: value.bundle_id,
          expiration_date: value.expiration_date,
        })
        .then((id) => {
          const productId = id[0];
          res.send({ id: productId });
        })
        .catch((error) => {
          console.log(`${error}`);

          res.sendStatus(500);
        });
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
        console.log(`Failed to validate donor: ${err}`);
        return;
      }

      knex.select()
        .table('products_scanned')
        .where('id', value.product_id)
        .then((rows) => {
          const product = rows[0];
          res.json(product);
        })
        .catch((error) => {
          console.log(`Failed to query for product: ${error}`);

          res.sendStatus(500);
        });
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
        return;
      }

      knex.select()
        .table('products_scanned')
        .where('bundle_id', value.bundle_id)
        .then((rows) => {
          res.json(rows);
        })
        .catch((error) => {
          console.log(`Failed to query for products: ${error}`);

          res.sendStatus(500);
        });
    });
  },
};

module.exports = productController;
