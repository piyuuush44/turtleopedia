const Posts = require('../../../models/posts');

/* exports.getFeaturedPosts = async () => {
  const featuredPosts = [];
  Posts.find({}).sort({no_of_views: -1}).exec(function(err, post) {
    for (i = 0; i < 5; i++) {
      featuredPosts.push(post);
    }
    return featuredPosts;
  });
};  */

exports.getFeaturedPosts = async () => Posts.find().limit(5)
    .sort({no_of_views: -1});
