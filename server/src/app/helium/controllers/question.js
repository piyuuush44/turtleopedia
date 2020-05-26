const ClientError = require('../../../errors').client;
const Questions = require('../models/question');

exports.postQuestion = async (req, res, next) => {
  try {
    if (req.body.options.length !== 4) {
      return next(new ClientError({message: 'Options are not valid'}));
    }
    const question = new Questions();
    question.text = req.body.text;
    question.options = req.body.options;
    await question.save();

    return res.json({
      result: {
        question: question,
      },
      message: 'Question registered successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.putUpdateQuestionById = async (req, res, next) => {
  try {
    const {question} = req;
    if (req.body.title) {
      question.title = req.body.title;
    }
    if (req.body.options) {
      question.options = req.body.options;
    }
    await question.save();

    return res.json({
      result: {
        question: question,
      },
      message: 'Question updated successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.deleteQuestionById = async (req, res, next) => {
  try {
    const {_id} = req.question;
    await Questions.deleteOne({_id: _id});

    return res.json({
      message: `Question with id : ${_id} deleted successfully`,
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.getQuestionById = async (req, res, next) => {
  const {question} = req;

  return res.json({
    result: {
      question: question,
    },
    message: 'Question found successfully',
  });
};

exports.getQuestions = async (req, res, next) => {
  const questions = await Questions.find();
  return res.json({
    result: {
      questions: questions,
    },
    message: 'Questions found successfully',
  });
};
