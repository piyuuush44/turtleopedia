const WebsiteController = require('../controllers/website');
const Schema = require('../schema/website');
const middlewares = require('../middlewares/middleware');

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
    route: '/postUploadFiles',
    controller: WebsiteController.postUploadFiles,
    middlewares: [
      middlewares.uploadHandler.single('hi'),
    ],
  },
];
