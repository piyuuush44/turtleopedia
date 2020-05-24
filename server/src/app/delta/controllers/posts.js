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
    message: `Blog post with id ${req.params.id} returned successfully`,
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
};

exports.deletePostById = async (req, res, next) => {
  const {_id} = req.post;
  await Posts.deleteOne({_id: _id});

  return res.json({
    message: `Blog post with id : ${_id} deleted successfully`,
  });
};

exports.postComment = async (req, res, next) => {

};
