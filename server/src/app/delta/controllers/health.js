const logger = require('../../../config/logger');
exports.get = async (req, res) => {
  logger.info('hi');
  return res.status(200).json('Peace....!!');
};
