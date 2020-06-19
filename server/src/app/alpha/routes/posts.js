const Controller = require('../controllers/dashboard');

module.exports = [
    {
        // to get top 5 posts
        method: 'get',
        route: '/featuredposts',
        controller: Controller.getDashboardData,
    },
];
