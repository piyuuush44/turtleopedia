const Posts = require('../../../models/posts');

exports.getFeaturedPosts = async () => Posts.find().limit(5)
    .sort({no_of_views: -1}).populate('user_id');
