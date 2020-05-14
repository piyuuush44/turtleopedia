const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: false},
  email: {type: String, required: true},
  password_hash: {type: String, required: true},
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_HELIUM);
module.exports = myDB.model('users', schema);
