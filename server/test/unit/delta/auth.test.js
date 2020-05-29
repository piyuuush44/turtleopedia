const request = require('supertest');
const bcrypt = require('bcrypt');
const util = require('../../../src/utils/auth_utils');
const app = require('../../../app');

const Posts = require('../../../src/app/delta/models/posts');
const User = require('../../../src/app/delta/models/user');

let server;

beforeEach(() => {
  server = request(app);
});

// negative scenario for login api when email is not found
// negative scenario for login api when password is incorrect

describe('login api test cases', () => {
  it('should login', async () => {
    const user = new User();
    user.first_name = 'turtle';
    user.last_name = 'singh';
    user.email = 'tech@turtleopedia.com';
    user.password_hash = await util.getPasswordHash('password');

    const finalUser = await user.save();
    const body = {
      email: 'tech@turtleopedia.com',
      password: 'password',
    };
    const url = '/delta/login';
    const response = await server.post(url).send(body);
    console.log(response.body);
  });
});
