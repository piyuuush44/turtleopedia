const {Joi} = require('celebrate');

module.exports = {
  postQuiz: {
    body: Joi.object()
        .keys({
          title: Joi.string().required(),
        }),
  },
  putQuizActivate: {
    params: {
      quiz_id: Joi.string().required(),
    },
  },
  putQuizDeactivate: {
    params: {
      quiz_id: Joi.string().required(),
    },
  },
};
