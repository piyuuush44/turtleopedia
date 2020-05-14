const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: {type: String, required: false},
  options: {type: Array, required: true},
  is_active: {type: Boolean, default: true},
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_HELIUM);
module.exports = myDB.model('questions', schema);
