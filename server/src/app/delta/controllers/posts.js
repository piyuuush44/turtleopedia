const Comments = require('../models/comments');
const Posts = require('../models/posts');
const ClientError = require('../../../errors').client;

exports.postPosts = async (req, res, next) => {
  try {
    const {title, category, content} = req.body;

    const post = new Posts();
    post.title = title;
    post.category = category;
    post.content = content;

    await post.save();

    return res.json({
      result: {post: post},
      message: 'Blog post created successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getPostById = async (req, res, next) => {
  const {post} = req;
  return res.json({
    result: {post: post},
    message: `Blog post with id ${req.params.post_id} returned successfully`,
  });
};

exports.getPosts = async (req, res, next) => {
  const posts = await Posts.find();
  return res.json({
    result: {posts: posts},
    message: 'All Blog post returned successfully',
  });
};

exports.putUpdatePostById = async (req, res, next) => {
  try {
    const {post} = req;
    const {title, category, content} = req.body;

    post.title = title;
    post.category = category;
    post.content = content;

    await post.save();

    return res.json({
      result: {post: post},
      message: 'Blog post updated successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.deletePostById = async (req, res, next) => {
  const {_id} = req.post;
  await Posts.deleteOne({_id: _id});

  return res.json({
    message: `Blog post with id : ${_id} deleted successfully`,
  });
};

exports.postComment = async (req, res, next) => {
  try {
    const {text, parentCommentId} = req.body;
    const comment = new Comments();
    comment.post_id = req.post._id;
    comment.text = text;
    comment.user_id = req.user._id;

    if (parentCommentId) {
      comment.parent_comment_id = parentCommentId;
    }
    await comment.save();
    return res.json({
      result: {comment: comment},
      message: 'Comment created successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getCommentsByPost = async (req, res, next) => {
  const {_id} = req.post;
  const query = {};
  query['post_id'] = _id;

  const comments = await Comments.find(query);
  return res.json({
    result: {comments: comments},
    message: `Comments returned successfully for post id: ${_id}`,
  });
};

exports.deleteCommentById = async (req, res, next) => {
  const {_id} = req.comment;
  await Comments.deleteOne({_id: _id});

  return res.json({
    message: `Comment with id : ${_id} deleted successfully`,
  });
};

exports.postFilterPost = async (req, res, next) => {
  const {category} = req.body;
  let query={};
  if (category) {
  query['category'] = category;
  }
  const posts = await Posts.find(query);
  return res.json({
    result: {posts: posts},
    message: `Blog Posts with category ${category} returned successfully`,
  });
};