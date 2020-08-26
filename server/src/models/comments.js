const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectID, ref: 'posts', required: true,
  },
  child_comments: [{type: mongoose.Schema.Types.ObjectID, ref: 'comments'}],
  message: {type: String, required: true},
  user_id: {
    type: mongoose.Schema.Types.ObjectID, ref: 'users', required: false,
  },
  name: {type: String, required: true},
  email: {type: String, required: true},
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('comments', schema);
