const Controller = require('../controllers/neon');
module.exports = [
  {
    method: 'get',
    route: '/home',
    controller: Controller.getHome,
  },
  {
    method: 'get',
    route: '/download',
    controller: Controller.getVideoDownload,
  },
];
