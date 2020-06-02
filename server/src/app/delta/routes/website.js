const WebsiteController = require('../controllers/website');

module.exports = [
  {
    method: 'get',
    route: '/webdata',
    controller: WebsiteController.getWebsiteData,
  },
  {
    method:'post',
    route:'/contactus',
    controller:WebsiteController.contactUs,
  },
];
