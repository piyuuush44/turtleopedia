const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {type: String, required: false},
  is_active: {type: Boolean, default: true},
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_HELIUM);
module.exports = myDB.model('quiz', schema);
