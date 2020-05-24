const Controller = require('../controllers/posts');
module.exports = [
  {
    method: 'post',
    route: '/posts',
    controller: Controller.postPosts,
  },
];
