const featuredPosts = require('../utils/website');
const ClientError = require('../../../errors').client;

exports.getDashboardData = async (req, res, next) => {
  try {
    return res.json({
      result: {
        featuredPosts: featuredPosts.getFeaturedPosts(),
      },
      message: 'Posts returned Successfully!',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};
