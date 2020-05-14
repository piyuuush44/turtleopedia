const Quiz = require('../models/quiz');
const ClientError = require('../../../errors').client;

exports.getHome = async (req, res, next) => {
  const quiz = await Quiz.find();
  const data = {
    title: 'Quiz',
    url: 'http://sumit',
    quiz: quiz,
  };
  return res.render('helium/index', data);
};

exports.postQuiz = async (req, res, next) => {
  try {
    const quiz = new Quiz();
    quiz.title = req.body.title;
    await quiz.save();

    return res.json({
      result: {
        quiz: quiz,
      },
      message: 'Quiz registered successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.putQuizActivate = async (req, res, next) => {
  try {
    const {quiz} = req;
    quiz.is_active = true;

    await quiz.save();

    return res.json({
      result: {
        quiz: quiz,
      },
      message: 'Quiz activated successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.putQuizDeactivate = async (req, res, next) => {
  try {
    const {quiz} = req;
    quiz.is_active = false;

    await quiz.save();

    return res.json({
      result: {
        quiz: quiz,
      },
      message: 'Quiz deactivated successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};
