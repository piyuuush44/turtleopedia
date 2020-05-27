const {Joi} = require('celebrate');
const constants = require('../../../utils/constants');

module.exports = {
  postPosts: {
    body: Joi.object()
        .keys({
          title: Joi.string().required(),
          category: Joi.string().valid(
              ...constants.BLOG_POST_CATEGORIES,
          )
              .required(),
          content: Joi.array().required(),
        }),
  },
  putUpdatePostById: {
    body: Joi.object()
        .keys({
          title: Joi.string().required(),
          category: Joi.string().valid(
              ...constants.BLOG_POST_CATEGORIES,
          ).required(),
          content: Joi.array().required(),
        }),
    params: {
      post_id: Joi.string().required(),
    },
  },
  getPostById: {
    params: {
      post_id: Joi.string().required(),
    },
  },
  deletePostById: {
    params: {
      post_id: Joi.string().required(),
    },
  },
  postComment: {
    params: {
      post_id: Joi.string().required(),
    },
    body: {
      parent_comment_id: Joi.string(),
      text: Joi.string().required(),
    },
  },
  getCommentsByPost: {
    params: {
      post_id: Joi.string().required(),
    },
  },
  deleteCommentById: {
    params: {
      post_id: Joi.string().required(),
      comment_id: Joi.string().required(),
    },
  },
  postFilterPost: {
    body: {
      category: Joi.string().required(),
    },
  },
};
