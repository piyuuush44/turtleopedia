const Comments = require('../../../models/comments');
const Posts = require('../../../models/posts');
const Users = require('../../../models/user');
const ClientError = require('../../../errors').client;
const controllerUtils = require('../../../utils/controller_utils');
const constants = require('../../../utils/constants');
/* eslint-disable camelcase */
exports.postPosts = async (req, res, next) => {
  try {
    const {user} = req;
    const {
      title,
      category,
      content,
      is_top,
      image_url,
      slug_url,
      feature_content,
      tags,
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
    post.tags = tags;
    post.user_id = user._id;

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
  try {
    const {post} = req;
    post.no_of_views += 1;
    await post.save();
    return res.json({
      result: {post: post},
      message: `Blog post with id ${req.params.post_id} returned successfully`,
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getPostBySlugUrl = async (req, res, next) => {
  try {
    const {post} = req;
    post.no_of_views += 1;
    await post.save();
    return res.json({
      result: {post: post},
      message: `
      Blog post with slug url ${req.params.slug_url} returned successfully`,
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getPosts = async (req, res, next) => {
  let sort;
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  const sortBy = req.query.sortBy;
  const postsQuery = Posts.find().skip(offset).limit(limit)
      .populate({path: 'user_id', model: Users});
  const count = await Posts.count();
  if (sortBy) {
    const finalSortValue = sortBy.split(',');
    if (finalSortValue[1] === 'asc') {
      sort = {createdAt: 1};
    } else {
      sort = {createdAt: -1};
    }
    postsQuery.sort(sort);
  }
  const finalResult = await postsQuery;
  return res.json(controllerUtils.getPaginatedResponse(
      finalResult,
      count,
      req.query,
      constants.DELTA_POSTS_PAGINATED_URL,
  ));
};

/* eslint-disable camelcase */
exports.putUpdatePostById = async (req, res, next) => {
  try {
    const {post} = req;
    const {
      title,
      category,
      content,
      is_top,
      image_url,
      slug_url,
      feature_content,
      tags,
    } = req.body;

    post.title = title;
    post.category = category;
    post.content = content;
    post.is_top = is_top;
    post.image_url = image_url;
    post.slug_url = slug_url;
    post.feature_content = feature_content;
    post.tags = tags;

    await post.save();

    return res.json({
      result: {post: post},
      message: 'Blog post updated successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};
/* eslint-enable camelcase */

exports.deletePostById = async (req, res, next) => {
  const {_id} = req.post;
  await Posts.deleteOne({_id: _id});

  return res.json({
    message: `Blog post with id : ${_id} deleted successfully`,
  });
};

exports.postComment = async (req, res, next) => {
  try {
    const parentCommentId = req.body.parent_comment_id;

    const {message} = req.body;
    const comment = new Comments();
    comment.post_id = req.post._id;
    comment.message = message;
    comment.name = req.body.name;
    comment.email = req.body.email;
    const finalComment = await comment.save();

    if (parentCommentId) {
      comment.parent_comment_id = parentCommentId;
      const parentComment = await Comments.findById(parentCommentId);
      if (!parentComment.child_comments) {
        parentComment.child_comments = [];
      }
      parentComment.child_comments.push(finalComment._id);
      await parentComment.save();
    }
    return res.json({
      result: {comment: finalComment},
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
  const comments = await Comments.find(query).populate('child_comments');

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
  let sort;

  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const sortBy = req.query.sortBy;
  const {category} = req.query;
  const categoryArray = category ? category.split(',') :
        constants.BLOG_POST_CATEGORIES;

  const aggregateArray = [{
    $match:
            {
              category: {
                $in: categoryArray,
              },
            },
  },
  {
    $match:
                {
                  is_active: true,
                },
  },
  ];

  if (sortBy) {
    const finalSortValue = sortBy.split(',');
    if (finalSortValue[1] === 'asc') {
      sort = {createdAt: 1};
    } else {
      sort = {createdAt: -1};
    }
    aggregateArray.push({
      $sort: sort,
    });
  }

  // posts based on query
  const posts = await Posts.aggregate(
      aggregateArray,
  ).skip(offset).limit(limit);

  // total post count
  const count = await Posts.aggregate(aggregateArray).count('title');
  const finalCount = count[0] && count[0]['title'] ? count[0]['title'] : 0;

  return res.json(controllerUtils.getPaginatedResponse(
      posts,
      finalCount,
      req.query,
      constants.DELTA_CATEGORY_PAGINATED_URL,
  ));
};
