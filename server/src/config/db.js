const logger = require('../config/logger');
const mongoose = require('mongoose');
const util = require('util');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB_HELIUM,
  MONGO_URL_SUBSTRING,
} = process.env;


let url;
if (process.env.NODE_ENV === 'local') {
  url = `${MONGO_URL_SUBSTRING}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_HELIUM}?authSource=admin`;
} else {
  url = `${MONGO_URL_SUBSTRING}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB_HELIUM}`;
}

logger.info(url);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

mongoose.connect(url, options)
    .then((_) => logger.info(`connected to ${MONGO_DB_HELIUM}`))
    .catch((error) => logger.error(util.inspect(error)));

module.exports = mongoose;
