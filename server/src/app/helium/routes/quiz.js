const QuizController = require('../controllers/quiz');
const Middleware = require('../middlewares/middlewares');
const Schema = require('../schema/quiz');

module.exports = [
  {
    method: 'get',
    route: '/quiz',
    controller: QuizController.getHome,
  },
  {
    // Register a new quiz
    method: 'post',
    route: '/quiz',
    schema_validation: Schema.postQuiz,
    controller: QuizController.postQuiz,
  },
  {
    // activate quiz'
    method: 'put',
    route: '/quiz/:quiz_id/activate',
    middlewares: [Middleware.checkQuizById],
    schema_validation: Schema.putQuizActivate,
    controller: QuizController.putQuizActivate,
  },
  {
    // deactivate quiz
    method: 'put',
    route: '/quiz/:quiz_id/deactivate',
    middlewares: [Middleware.checkQuizById],
    schema_validation: Schema.putQuizDeactivate,
    controller: QuizController.putQuizDeactivate,
  },
];
