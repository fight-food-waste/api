const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import routes
const indexRouter = require('./routes/index');
const donorRouter = require('./routes/donor');
const bundleRouter = require('./routes/bundle');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

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

// load routes
app.use('/', indexRouter);
app.use('/donor', donorRouter);
app.use('/bundle', bundleRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);

// else: catch 404
app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
