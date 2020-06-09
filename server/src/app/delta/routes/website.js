const WebsiteController = require('../controllers/website');
const Schema=require('../schema/website');

module.exports = [
  {
    method: 'get',
    route: '/webdata',
    controller: WebsiteController.getWebsiteData,
  },
  {
    method: 'post',
    route: '/contactus',
    controller: WebsiteController.postContactUs,
    schema_validation: Schema.postContactUs,
  },
  {
    method: 'post',
    route: '/subscribe',
    controller: WebsiteController.postEmailSubscription,
    schema_validation: Schema.postEmailSubscription,
  },
];
