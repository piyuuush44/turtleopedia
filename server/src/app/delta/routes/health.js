const HealthController = require('../controllers/health');

module.exports = [
  {
    method: 'get',
    route: '/health',
    controller: HealthController.get,
  },
];
