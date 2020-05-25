const Middleware = require('../middlewares/middleware');
const Controller = require('../controllers/posts');
const Schema = require('../schema/posts');

module.exports = [
  {
    method: 'post',
    route: '/posts',
    controller: Controller.postPosts,
    schema_validation: Schema.postPosts,
  },
  {
    method: 'get',
    route: '/post/:post_id',
    controller: Controller.getPostById,
    middlewares: [Middleware.checkPostById],
    schema_validation: Schema.getPostById,
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
    middlewares: [Middleware.checkPostById],
    schema_validation: Schema.putUpdatePostById,
  },
  {
    method: 'delete',
    route: '/post/:post_id',
    controller: Controller.deletePostById,
    middlewares: [Middleware.checkPostById],
    schema_validation: Schema.deletePostById,
  },
  {
    method: 'post',
    route: '/:post_id/comments',
    controller: Controller.postComment,
    middlewares: [Middleware.checkPostById],
    schema_validation: Schema.postComment,
  },
  {
    method: 'post',
    route: '/post/:category',
    controller: Controller.postFilterPost,
    schema_validation: Schema.postFilterPost,
  },
];
