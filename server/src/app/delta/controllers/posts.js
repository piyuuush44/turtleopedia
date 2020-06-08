const Comments = require('../../../models/comments');
const Posts = require('../../../models/posts');
const ClientError = require('../../../errors').client;
const controllerUtils = require('../../../utils/controller_utils');
const constants = require('../../../utils/constants');
/* eslint-disable camelcase */
exports.postPosts = async (req, res, next) => {
  try {
    // const {user} = req;
    const {
      title,
      category,
      content,
      is_top,
      image_url,
      slug_url,
      feature_content,
    } = req.body;
    const isTop = is_top ? is_top : false;
    const imageUrl = image_url ? image_url : '';

    const post = new Posts();
    post.title = title;
    post.category = category;
    post.content = content;
    post.is_top = isTop;
    post.image_url = imageUrl;
    post.slug_url = slug_url;
    post.feature_content = feature_content;

    await post.save();

    return res.json({
      result: {post: post},
      message: 'Blog post created successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};
/* eslint-enable camelcase */

exports.getPostById = async (req, res, next) => {
  try{
  const {post} = req;
  if(req.params.post_id)
  post.no_of_views=post.no_of_views+1;
  await post.save();
  return res.json({
    result: {post: post},
    message: `Blog post with id ${req.params.post_id} and views ${+post.no_of_views} returned successfully`,
  });
} catch(e) {
  return next(new ClientError({message:e.message}));
}
};

exports.getPosts = async (req, res, next) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  const posts = await Posts.find().skip(offset).limit(limit);
  const count = await Posts.count();
  return res.json(controllerUtils.getPaginatedResponse(
      posts,
      count,
      req.query,
      constants.DELTA_POSTS_PAGINATED_URL,
  ));
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

exports.getFilterPost = async (req, res, next) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  const {category} = req.query;
  const categoryArray = category ? category.split(',') :
        constants.BLOG_POST_CATEGORIES;
  const posts = await Posts.aggregate(
      [
        {
          $match: {
            category: {
              $in: categoryArray,
            },
          },
        },
      ],
  ).skip(offset).limit(limit);
  const count = await Posts.count();
  return res.json(controllerUtils.getPaginatedResponse(
      posts,
      count,
      req.query,
      constants.DELTA_CATEGORY_PAGINATED_URL,
  ));
};
