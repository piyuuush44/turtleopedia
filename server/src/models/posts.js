const logger = require('../config/logger');
const mongoose = require('mongoose');
const constants = require('../utils/constants');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  is_top: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
  },
  content: {
    type: Array,
    required: true,
  },
  no_of_views: {
    type: Number,
    default: 0,
    required: true,
  },
  slug_url: {
    type: String,
  },
  feature_content: {
    type: String,
  },
  tags: {type: Array},
  user_id: {
    type: mongoose.Schema.Types.ObjectID, ref: 'users', required: true,
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
module.exports = myDB.model('posts', schema);
