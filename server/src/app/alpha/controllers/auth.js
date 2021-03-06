const bcrypt = require('bcrypt');
const ClientError = require('../../../errors').client;
const User = require('../../../models/user');
const authUtils = require('../../../utils/auth_utils');

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return next(new ClientError({
        message: 'Invalid request! User not found',
      }));
    }

    const passCheck = await bcrypt.compare(
        req.body.password,
        user.password_hash,
    );
    if (!passCheck) {
      return next(new ClientError({
        message: 'Invalid request! Wrong Password',
      }));
    }
    const token = authUtils.signJwt(
        {id: user._id},
        process.env.TURTLEOPEDIA_JWT_SECRET_KEY,
        authUtils.getJwtExpirationTime(),
    );
    return res.json({
      result: {
        user: user,
        token: token,
      },
      message: 'User found successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.postRegister = async (req, res, next) => {
  let user = await User.findOne({email: req.body.email});
  if (user) {
    return next(new ClientError({message: 'User already found '}));
  }
  try {
    const hash = await authUtils.getPasswordHash(req.body.password);

    user = new User();
    user.email = req.body.email;
    user.password_hash = hash;
    user.stage_history = [{stage: 'pending', time: Date.now()}];
    user.stage = 'pending';
    await user.save();

    const token = authUtils.signJwt(
        {id: user._id},
        process.env.TURTLEOPEDIA_JWT_SECRET_KEY,
        authUtils.getJwtExpirationTime(),
    );
    return res.json({
      result: {
        user: user,
        token: token,
      },
      message: 'User registered successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.postPasswordReset = async (req, res, next) => {
  const {user} = req;
  try {
    user.password_hash = await authUtils.getPasswordHash(req.body.password);
    await user.save();

    const token = authUtils.signJwt(
        {id: user._id},
        process.env.TURTLEOPEDIA_JWT_SECRET_KEY,
        authUtils.getJwtExpirationTime(),
    );
    return res.json({
      result: {
        user: user,
        token: token,
      },
      message: 'User registered successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.postPasswordResetEmail = async (req, res, next) => {
  try {
    return res.json({
      message: 'Email send successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.putProfileUpdate = async (req, res, next) => {
  try {
    const {user} = req;

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.phone = req.body.phone;

    await user.save();

    return res.json({
      result: {
        user: user,
      },
      message: 'User updated successfully',
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.putUserActivate = async (req, res, next) => {
  try {
    const {user} = req;
    user.stage = 'approved';
    user.stage_history = stage_history.push({
      stage: 'approved',
      time: date.now(),
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

exports.putUserDeactivate = async (req, res, next) => {
  try {
    const {user} = req;
    user.stage = 'disabled';
    user.stage_history = stage_history.push({
      stage: 'disabled',
      time: date.now(),
    });
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};

