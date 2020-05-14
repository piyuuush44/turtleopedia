const HealthController = require('../controllers/health');

module.exports = [
  {
    method: 'get',
    route: '/',
    controller: HealthController.get,
  },
];
