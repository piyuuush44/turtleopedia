const asyncHandler = require('express-async-handler');
const Posts = require('../models/posts');
const ClientError = require('../../../errors/client');

/**
 * This method checks if the post is available or not, and assigns
 * the {@link req.post}
 * If the post is not found,
 * it throws an 204 ie no content.
 *
 */
exports.checkPostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.post_id;
  const post = await Posts.findById(postId);
  if (!post) {
    return next(new ClientError({
      message: `Blog Post not found for id: ${postId}`,
    }));
  }
  req.post = post;
  next();
});
