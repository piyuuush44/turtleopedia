const {Joi} = require('celebrate');

module.exports = {
  postRegister: {
    body: Joi.object()
        .keys({
          password: Joi.string().required(),
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
  putProfileUpdate: {
    params: {
      id: Joi.string().required(),
    },
    body: Joi.object()
        .keys({
          name: Joi.string().required(),
        }),
  },
};
