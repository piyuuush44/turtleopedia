const constants = require('../../../utils/constants');
const utils = require('../../../utils/utils');

exports.get = async (req, res) => {
  console.log(utils.convertArrayKeyToString(constants.BLOG_POST_CATEGORIES));
  return res.status(200).json('hello');
};
