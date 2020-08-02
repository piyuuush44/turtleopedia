const logger = require('./logger');
const mongoose = require('mongoose');
const util = require('util');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB_DELTA,
  MONGO_URL_SUBSTRING,
} = process.env;


let url;
if (process.env.NODE_ENV === 'local') {
  url = `${MONGO_URL_SUBSTRING}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_DELTA}?authSource=admin`;
} else {
  url = `${MONGO_URL_SUBSTRING}/${MONGO_DB_DELTA}`;
}

logger.info(url);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

mongoose.connect(url, options)
    .then((_) => {
      logger.info(`connected to mongo db`);
    })
    .catch((error) => {
      logger.error(util.inspect(error));
    });


module.exports = mongoose;
