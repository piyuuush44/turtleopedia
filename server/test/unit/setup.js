const request = require('supertest');
const User = require('../../src/models/user');
const Middlewares = require('../../src/app/delta/middlewares/middleware');
const authUtils = require('../../src/utils/auth_utils');

exports.setupMocksAndServer = async () => {
  const user = new User();
  user.first_name = 'test';
  user.last_name = 'user';
  user.email = 'test@turtleopedia.com';
  user.password_hash = 'abc';
  const finalUser = await user.save();

  // Mock verifyJwt method so we don't call Auth0
  Middlewares.isAuthentic = jest.fn(async (req, res, next) => {
    req.user = finalUser;
    next();
  });

  const app = require('../../app');
  const server = request(app);
  const jwt = authUtils.signJwt(
      {id: finalUser._id},
      process.env.TURTLEOPEDIA_JWT_SECRET_KEY,
      authUtils.getJwtExpirationTime(),
  );
  const token = `Bearer ${jwt}`;

  return {
    mockedServer: server,
    token: token,
    accessToken: process.env.AUTH0_TEST_ACCESS_TOKEN,
    user: user,
  };
};

exports.init = async function() {
  // Mock verifyJwt
  Middlewares.isAuthentic = jest.fn((req, res, next) => {
    next();
  });
};
