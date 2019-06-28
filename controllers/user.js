const Joi = require('joi');
const knex = require('knex')(require('../knexfile'));

const userController = {
  findOne(req, res) {
    const schema = Joi.object()
      .keys({
        user_id: Joi.number()
          .integer()
          .required(),
      });

    Joi.validate({ user_id: req.params.id }, schema, (err, value) => {
      if (err !== null) {
        res.sendStatus(400);
        console.log(`Failed to validate user: ${err}`);
      } else if (req.user_id !== value.user_id) {
        // Can't get another user's info
        res.sendStatus(403);
      } else {
        knex.select()
          .table('users')
          .where('id', value.user_id)
          .then((rows) => {
            const user = {
              id: rows[0].id,
              first_name: rows[0].first_name,
              last_name: rows[0].last_name,
              email: rows[0].email,
              company_name: rows[0].company_name,
              phone_number: rows[0].phone_number,
            };
            res.json(user);
          })
          .catch((error) => {
            console.log(`Failed to query for user: ${error}`);

            res.sendStatus(500);
          });
      }
    });
  },
  findSelf(req, res) {
    knex.select()
      .table('users')
      .where('id', req.user_id) // self id
      .then((rows) => {
        const user = {
          id: rows[0].id,
          first_name: rows[0].first_name,
          last_name: rows[0].last_name,
          email: rows[0].email,
          company_name: rows[0].company_name,
          phone_number: rows[0].phone_number,
        };
        res.json(user);
      })
      .catch((error) => {
        console.log(`Failed to query for user: ${error}`);

        res.sendStatus(500);
      });
  },
};

module.exports = userController;
