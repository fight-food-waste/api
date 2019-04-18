const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const router = require('./routes/router');

// init express
const app = express();

// load middlewares
// logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(logFormat));
}
// parsing of POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set some HTTP headers for security
app.use(helmet());

// load routes
app.use(router);

// else: catch 404
app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
