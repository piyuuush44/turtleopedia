const logger = require('../../../config/logger');
exports.get = async (req, res) => {
  logger.info(process.env);
  return res.status(200).json('Working fine......Great!!');
};
