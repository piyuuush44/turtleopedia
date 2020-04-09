const {Joi} = require('celebrate');
const constants = require('../../../utils/constants');

module.exports = {
  postRegister: {
    body: Joi.object()
        .keys({
          phone: Joi.string().trim().regex(constants.PHONE_REGEX),
          password: Joi.string().required(),
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().email().lowercase().required(),
        }),
  },
  postLogin: {
    body: Joi.object()
        .keys({
          password: Joi.string().required(),
          email: Joi.string().email().lowercase().required(),
        }),
  },
  postPasswordReset: {
    body: Joi.object()
        .keys({
          password: Joi.string().required(),
        }),
  },
};