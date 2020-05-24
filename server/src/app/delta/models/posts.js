const logger = global;
const mongoose = require('mongoose');
const constants = require('../../../utils/constants');

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: Array, required: true},
  category: {type: String, enum: constants.BLOG_POST_TYPES, required: true},
},
{timestamps: true},
);

schema.post('save', () => {
  logger.info(`Post saved successfully`);
});

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('Posts', schema);
