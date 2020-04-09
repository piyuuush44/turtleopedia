const logger = require('./logger');
const mongoose = require('mongoose');
const util = require('util');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_URL_SUBSTRING,
} = process.env;


let url;
if (process.env.NODE_ENV === 'prod') {
  url = `${MONGO_URL_SUBSTRING}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}`;
} else {
  url = `${MONGO_URL_SUBSTRING}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
}

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

mongoose.connect(url, options)
    .then((_) => logger.info('Connected to mongo'))
    .catch((error) => logger.error(util.inspect(error)));
