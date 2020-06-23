const {Joi} = require('celebrate');
module.exports = {
  postContactUs: {
    body: Joi.object()
        .keys({
          name: Joi.string().required(),
          email: Joi.string().required(),
          message: Joi.string().required(),
        }),
  },
  postEmailSubscription: {
    body: Joi.object()
        .keys({
          email: Joi.string().required(),
        }),
  },
};
