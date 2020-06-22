const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
},
{timestamps: true},
);

schema.post('save', () => {
  logger.info(`Subscribed successfully`);
});

const myDB = mongoose.connection.useDb(process.env.MONGO_DB_DELTA);
module.exports = myDB.model('Comments', schema);
