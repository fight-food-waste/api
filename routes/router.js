/* eslint-disable global-require */
const router = require('express').Router();

const controllers = [
  require('./auth'),
  require('./bundle'),
  require('./donor'),
  require('./index'),
  require('./product'),
];

controllers.forEach(controller => router.use('/', controller));

module.exports = router;
