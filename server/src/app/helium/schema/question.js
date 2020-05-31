const {Joi} = require('celebrate');

module.exports = {
  postQuestion: {
    body: Joi.object()
        .keys({
          text: Joi.string().required(),
          options: Joi.array().required(),
        }),
  },
  putUpdateQuestionById: {
    params: {
      question_id: Joi.string().required(),
    },
    body: Joi.object()
        .keys({
          text: Joi.string(),
          options: Joi.array(),
        }),
  },
  getQuestionById: {
    params: {
      question_id: Joi.string().required(),
    },
  },
  deleteQuestionById: {
    params: {
      question_id: Joi.string().required(),
    },
  },
};
