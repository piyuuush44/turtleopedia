const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  phone: {type: String, required: false},
  email: {type: String, required: true},
  password_hash: {type: String, required: true},
},
{timestamps: true},
);

module.exports = mongoose.model('users', schema);