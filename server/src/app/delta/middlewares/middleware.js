const asyncHandler = require('express-async-handler');
const Comments = require('../models/comments');
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

/**
 * This method checks if the comment is available or not, and assigns
 * the {@link req.comment}
 * If the comment is not found,
 * it throws an 204 ie no content.
 *
 */
exports.checkCommentById = asyncHandler(async (req, res, next) => {
  const commentId = req.params.comment_id;
  const comment = await Comments.findById(commentId);
  if (!comment) {
    return next(new ClientError({
      message: `Comment not found for this id: ${commentId}`,
    }));
  }
  req.comment = comment;
  next();
});
