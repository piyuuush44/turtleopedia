const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  message: {type: String, required: true},
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('contact', schema);
