const Controller = require('../controllers/auth');
const Schema = require('../schema/auth');
const Middleware = require('../middlewares/auth');

module.exports = [
// apis for auth
  {
    // Register a new user
    method: 'post',
    route: '/register',
    schema_validation: Schema.postRegister,
    controller: Controller.postRegister,
  },
  {
    // logs in an user
    method: 'post',
    route: '/login',
    schema_validation: Schema.postLogin,
    controller: Controller.postLogin,
  },
  {
    // logs in an user
    method: 'post',
    route: '/password_reset',
    middlewares: [Middleware.isAuthentic],
    schema_validation: Schema.postPasswordReset,
    controller: Controller.postPasswordReset,
  },
  {
    // update user's info
    method: 'put',
    route: '/profile/:id',
    middlewares: [Middleware.isAuthentic, Middleware.checkUserExists],
    schema_validation: Schema.putProfileUpdate,
    controller: Controller.putProfileUpdate,
  },
];
