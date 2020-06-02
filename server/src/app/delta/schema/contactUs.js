module.exports = {
    contactUs: {
      body: Joi.object()
          .keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            message: Joi.string().required(),
          }),
    }};