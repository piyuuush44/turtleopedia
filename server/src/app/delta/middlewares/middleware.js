const path = require('path');
const passport = require('passport');
const multer = require('multer');
const randomstring = require('randomstring');
const multerGoogleStorage = require('multer-google-storage');
const asyncHandler = require('express-async-handler');
const Comments = require('../../../models/comments');
const Posts = require('../../../models/posts');
const ClientError = require('../../../errors/client');
const User = require('../../../models/user');
const constants = require('../../../utils/constants');

/**
 * This method checks if the post is available or not, and assigns
 * the {@link req.post}
 * If the post is not found,
 * it throws an 204 ie no content.
 *
 */
exports.checkPostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.post_id;
  const post = await Posts.findById(postId);
  if (!post) {
    return next(new ClientError({
      message: `Blog Post not found for id: ${postId}`,
    }));
  }
  req.post = post;
  next();
});

/**
 * This method checks if the post is available by slug url or not, and assigns
 * the {@link req.post}
 * If the post is not found,
 * it throws an 204 ie no content.
 *
 */
exports.checkPostBySlugUrl = asyncHandler(async (req, res, next) => {
  const postId = req.params.slug_url;
  const post = await Posts.findOne({slug_url: postId});
  if (!post) {
    return next(new ClientError({
      message: `Blog Post not found for id: ${postId}`,
    }));
  }
  req.post = post;
  next();
});


/**
 * This method checks if the comment is available or not, and assigns
 * the {@link req.comment}
 * If the comment is not found,
 * it throws an 204 ie no content.
 *
 */
exports.checkCommentById = asyncHandler(async (req, res, next) => {
  const commentId = req.params.comment_id;
  const comment = await Comments.findById(commentId);
  if (!comment) {
    return next(new ClientError({
      message: `Comment not found for this id: ${commentId}`,
    }));
  }
  req.comment = comment;
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
  const user = await User.findById(id);
  if (!user) {
    return next(new ClientError({message: `User not found for id: ${id}`}));
  }
  next();
});

/**
 * This method is used to upload a file content in req.file to google storage
 * returns an instance of multer middleware
 */
exports.uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine(
      {
        projectId: process.env.GCLOUD_PROJECT,
        bucket: process.env.GCS_BUCKET,
        keyFilename: process.env.GCS_KEYFILE,
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const fileName = `images/${randomstring.generate(7)}${ext}`;

          // assigning file name array to req object
          req.fileName = [
            `${constants.GCS_URL}/${process.env.GCS_BUCKET}/${fileName}`,
          ];
          cb(null, fileName);
        },
      },
  ),
});
