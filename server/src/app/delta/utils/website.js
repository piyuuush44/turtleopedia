const Posts = require('../../../models/posts');

exports.categoryCount = async () => Posts.aggregate(
    [
      {
        '$group': {
          '_id': '$category',
          'count': {'$sum': 1},
        },
      }],
);

exports.getRecentPosts = async () => Posts.find().limit(6)
    .sort({createdAt: '-1'});

exports.getTopPosts = async () => Posts.find({is_top: true});
