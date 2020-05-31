const _ = require('lodash');
const siteUtils = require('../utils/website');
const constants = require('../../../utils/constants');

exports.getWebsiteData = async (req, res, next) => {
  const data = {};
  data['count'] = await siteUtils.categoryCount();
  data['recent_posts'] = await siteUtils.getRecentPosts();
  data['categories'] = constants.BLOG_POST_CATEGORIES
      .map((value) => _.startCase(value));

  data['top_posts'] = await siteUtils.getTopPosts();
  return res.json({
    result: {
      data: data,
    },
    message: 'Website data found successfully',
  });
};
