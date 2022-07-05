/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const router = require('./src/v1/router');
const DBConnect = require('./database/DBConnect');

const {
  headerFunction,
  errHandler,
} = require('./middleware/errorMiddleware');

// loading the env variables
dotenv.config({ path: './config/config.env' });

// getting the port from the environment variables
const PORT = process.env.PORT || 5500;

// initializing the express app
const app = express();

// setting up the cors
app.use(cors());

// adding helmet
app.use(helmet());

// limiting the request body
app.use(express.json({ limit: '20kb' }));

// Data Sanitization against XSS by preventing users from inserting HTML & Scripts on input.
app.use(xss());
app.use(mongoSanitize());

// configuring the body parser for parsing the data with req
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// header function
app.all('*', headerFunction);

// our server listening
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

// connecting to the database
DBConnect();

// error handlers
app.use(errHandler);
// app.use(notFound);

// api working check
app.get('/', (req, res) => {
  try {
    res.status(200).send('Welcome to Masjid API.');
  } catch (err) {
    res.status(404).send(err);
  }
});

// adding the routing file
app.use('/v1', router);
