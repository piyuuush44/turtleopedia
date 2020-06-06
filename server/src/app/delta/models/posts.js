const logger = require('../../../config/logger');
const mongoose = require('mongoose');
const constants = require('../../../utils/constants');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  is_top: {
    type: Boolean,
    default: false,
  },
  image_url: {
    type: Array,
  },
  content: {
    type: Array,
    required: true,
  },
  tags: {type: Array},
  user_id: {
    // todo in future keep required as true
    type: mongoose.Schema.Types.ObjectID, ref: 'Users', required: false,
  },
  category: {
    type: String,
    enum: constants.BLOG_POST_CATEGORIES,
    required: true,
  },
},
{timestamps: true},
);

schema.post('save', () => {
  logger.info(`Post saved successfully`);
});

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('Posts', schema);
