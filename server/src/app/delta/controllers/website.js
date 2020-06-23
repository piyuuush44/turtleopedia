const _ = require('lodash');
const siteUtils = require('../utils/website');
const constants = require('../../../utils/constants');
const ContactUs = require('../../../models/contact');
const EmailSubscription = require('../../../models/subscribe');

exports.getWebsiteData = async (req, res, next) => {
  const data = {};
  data['count'] = await siteUtils.categoryCount();
  data['recent_posts'] = await siteUtils.getRecentPosts();
  data['categories'] = constants.BLOG_POST_CATEGORIES
      .map((value) => _.startCase(value));

  data['top_posts'] = await siteUtils.getTopPosts();
  return res.json({
    result: {
      data: data,
    },
    message: 'Website data found successfully',
  });
};
exports.postEmailSubscription = async (req, res, next)=> {
  try {
    const {email} = req.body;
    const emailsubscription = new EmailSubscription();
    emailsubscription.email = email;

    await emailsubscription.save();

    return res.json({
      message: 'Subscribed Successfully! ',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.postContactUs = async (req, res, next) => {
  try {
    const {name, email, message} = req.body;
    const contactus = new ContactUs();
    contactus.name = name;
    contactus.email = email;
    contactus.message = message;

    await contactus.save();

    return res.json({
      message: 'Thanks for Contacting Us, We will reply back shortly!',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.postUploadFiles = async (req, res, next) => {
  return res.json({
    result: {
      fileUrl: req.fileName,
    },
    message: 'Files uploaded successfully!',
  });
};
