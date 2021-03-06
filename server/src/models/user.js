const mongoose = require('mongoose');
const constants = require('../utils/constants');

const schema = new mongoose.Schema({
  name: {type: String, required: false},
  email: {type: String, required: true},
  password_hash: {type: String, required: true},
  user_role: {
    type: Array,
    required: false,
  },
  stage: {
    type: String,
    enum: constants.USER_STAGE_CATEGORIES,
    default: 'pending',
  },
  stage_history: {
    type: Array,
    default: [],
  },
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('users', schema);
