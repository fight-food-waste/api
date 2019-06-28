/* eslint-disable global-require */
const router = require('express')
  .Router();
const token = require('../utils/token');

// Middleware that verifies the token
// and then passes it to req
router.use((req, res, next) => {
  if (req.originalUrl === '/auth' || req.originalUrl === '/') {
    // We don't need a token for these routes
    next();
  } else if (!req.header('token')) {
    // We need a token for any other route
    // FYI this is also where we end up for undefined routes (should be 404)
    res.sendStatus(403);
  } else {
    // If token exists, get user linked to this token
    token.getUser(req.header('token'))
      .then((userId) => {
        // Add userId to global Express variable
        // It will be usable by controllers
        req.user_id = userId;
        // Call next middleware
        next();
      })
      .catch((error) => {
        // Token not found or Knex error
        console.log(`Failed to authenticate user. ${error}`);
        res.sendStatus(403);
      });
  }
});

const controllers = [
  require('./auth'),
  require('./bundle'),
  require('./user'),
  require('./index'),
  require('./product'),
];

// Load each route file as a middleware
controllers.forEach(controller => router.use('/', controller));

module.exports = router;
