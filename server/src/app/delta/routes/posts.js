const Middleware = require('../middlewares/middleware');
const Controller = require('../controllers/posts');
const Schema = require('../schema/posts');

module.exports = [
  {
    method: 'post',
    route: '/posts',
    controller: Controller.postPosts,
    middlewares: [
      Middleware.isAuthentic,
    ],
    schema_validation: Schema.postPosts,
  },
  {
    method: 'get',
    route: '/post/:post_id',
    controller: Controller.getPostById,
    middlewares: [
      Middleware.checkPostById,
    ],
    schema_validation: Schema.getPostById,
  },
  {
    method: 'get',
    route: '/post/url/:slug_url',
    controller: Controller.getPostBySlugUrl,
    middlewares: [
      Middleware.checkPostBySlugUrl,
    ],
    schema_validation: Schema.getPostBySlugUrl,
  },
  {
    method: 'get',
    route: '/posts',
    controller: Controller.getPosts,
  },
  {
    method: 'put',
    route: '/post/:post_id',
    controller: Controller.putUpdatePostById,
    middlewares: [
      Middleware.checkPostById,
    ],
    schema_validation: Schema.putUpdatePostById,
  },
  {
    method: 'delete',
    route: '/post/:post_id',
    controller: Controller.deletePostById,
    middlewares: [
      Middleware.checkPostById,
    ],
    schema_validation: Schema.deletePostById,
  },
  {
    method: 'post',
    route: '/:post_id/comments',
    controller: Controller.postComment,
    middlewares: [
      Middleware.checkPostById,
    ],
    schema_validation: Schema.postComment,
  },
  {
    method: 'get',
    route: '/:post_id/comments',
    controller: Controller.getCommentsByPost,
    middlewares: [
      Middleware.checkPostById,
    ],
    schema_validation: Schema.getCommentsByPost,
  },
  {
    method: 'delete',
    route: '/:post_id/comments/:comment_id',
    controller: Controller.deleteCommentById,
    middlewares: [
      Middleware.checkPostById,
      Middleware.checkCommentById,
    ],
    schema_validation: Schema.deleteCommentById,
  },
  {
    method: 'get',
    route: '/filterPosts',
    controller: Controller.getFilterPost,
    schema_validation: Schema.getFilterPost,
  },
];
