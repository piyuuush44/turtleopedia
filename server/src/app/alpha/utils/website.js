const Posts = require('../../../models/posts');

exports.getFeaturedPosts = async () => {
    const featuredPosts = [];
    Posts.find({}).sort({ no_of_views: -1 }).exec(function (err, post) {
        for (i = 0; i < 5; i++) {
            featuredPosts.push(post);
        }
        return featuredPosts;
    });
};
