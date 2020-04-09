const Controller = require('../controllers/auth');
const Schema = require('../schema/auth');

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
    schema_validation: Schema.postPasswordReset,
    controller: Controller.postPasswordReset,
  },
];
