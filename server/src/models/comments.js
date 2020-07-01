const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectID, ref: 'posts', required: true,
  },
  parent_comment_id: {
    type: mongoose.Schema.Types.ObjectID, ref: 'comments', required: false,
  },
  text: {type: String, required: true},
  user_id: {
    type: mongoose.Schema.Types.ObjectID, ref: 'users', required: true,
  },
},
{timestamps: true},
);

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('comments', schema);
