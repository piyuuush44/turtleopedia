const Controller = require('../controllers/question');
const Schema = require('../schema/question');
const Middleware = require('../middlewares/middlewares');

module.exports = [
// apis for questions
  {
    // Register a new question
    method: 'post',
    route: '/questions',
    schema_validation: Schema.postQuestion,
    controller: Controller.postQuestion,
  },
  {// get all questions
    method: 'get',
    route: '/questions',
    controller: Controller.getQuestions,
  },
  {// get  question by id
    method: 'get',
    route: '/question/:question_id',
    middlewares: [Middleware.checkQuestionById],
    schema_validation: Schema.getQuestionById,
    controller: Controller.getQuestionById,
  },
  {// delete question by id
    method: 'delete',
    route: '/question/:question_id',
    middlewares: [Middleware.checkQuestionById],
    schema_validation: Schema.deleteQuestionById,
    controller: Controller.deleteQuestionById,
  },
  {
    // update question's info
    method: 'put',
    route: '/question/:question_id',
    middlewares: [Middleware.checkQuestionById],
    schema_validation: Schema.putUpdateQuestionById,
    controller: Controller.putUpdateQuestionById,
  },
];
