const passport = require('passport');
const asyncHandler = require('express-async-handler');
const Questions = require('../models/question');
const ClientError = require('../../../errors/client');

/**
 * This method checks if the question is available or not and assigns
 * the {@link req.question}
 * If the question is not found,
 * it throws an 204 ie no content.
 *
 */
exports.checkQuestionById = asyncHandler(async (req, res, next) => {
  const questionId = req.params.question_id;
  const question = await Questions.findById(questionId);
  if (!question) {
    return next(new ClientError({
      message: `Question not found for id: ${questionId}`,
    }));
  }
  req.question = question;
  next();
});


/**
 * This method checks if the customer is authenticated or not and assigns
 * the {@link req.user}
 * parameter to the customer object if authenticated.
 * If the customer is not authenticated,
 * it throws an 401.
 *
 */
exports.isAuthentic = passport.authenticate('jwt', {session: false});

/**
 * This method checks if user id passed via param is valid or not
 * and returns 401 if its invalid
 */
exports.checkUserExists = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const user =await User.findById(id);
  if (!user) {
    return next(new ClientError({message: `User not found for id: ${id}`}));
  }
  next();
});

exports.checkQuizById = asyncHandler(async (req, res, next)=>{
  next();
});
