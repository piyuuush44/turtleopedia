const request = require('supertest');
const util = require('../../../src/utils/auth_utils');
const app = require('../../../app');

const User = require('../../../src/models/user');

let server;

beforeEach(() => {
  server = request(app);
});

describe('login api test cases', () => {
  it('should login', async () => {
    const user = new User();
    user.first_name = 'turtle';
    user.last_name = 'singh';
    user.email = 'tech@turtleopedia.com';
    user.password_hash = await util.getPasswordHash('password');

    const finalUser = await user.save();
    // console.log(finalUser);
    const body = {
      email: 'tech@turtleopedia.com',
      password: 'password',
    };
    const url = '/delta/login';
    const response = await server.post(url).send(body);
    //  console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body.result.token.length).toBeGreaterThan(0);
    expect(response.body.result.user._id).toEqual(finalUser._id.toString());
    expect(response.body.result.user.email).toEqual(body.email);
    expect(response.body.result.user.password_hash)
        .toEqual(finalUser.password_hash);
  });
  it('email incorrect', async () => {
    const user = new User();
    user.first_name = 'turtle';
    user.last_name = 'singh';
    user.email = 'tech@turtleopedia.com';
    user.password_hash = await util.getPasswordHash('password');

    const finalUser = await user.save();
    //  console.log(finalUser);
    const body = {
      email: 'tech@turtleopeia.com',
      password: 'password',
    };
    const url = '/delta/login';
    const response = await server.post(url).send(body);
    // console.log(response.body);
    // console.log(response.status);
    expect(response.status).toEqual(200);
    expect(response.body.error.httpStatus).toEqual(400);
    expect(response.body.error.message)
        .toEqual('Invalid request! User not found');
  });
  it('password incorrect', async () => {
    const user = new User();
    user.first_name = 'turtle';
    user.last_name = 'singh';
    user.email = 'tech@turtleopedia.com';
    user.password_hash = await util.getPasswordHash('password');

    const finalUser = await user.save();
    // console.log(finalUser);
    const body = {
      email: 'tech@turtleopedia.com',
      password: 'passwo',
    };
    const url = '/delta/login';
    const response = await server.post(url).send(body);
    // console.log(response.body);
    // console.log(response.status);
    expect(response.status).toEqual(200);
    expect(response.body.error.httpStatus).toEqual(400);
    expect(response.body.error.message)
        .toEqual('Invalid request! Wrong Password');
  });
});

describe('registration api test cases', () => {
  it('Registration Successful', async () => {
    const user = new User();
    user.first_name = 'turtle';
    user.last_name = 'singh';
    user.email = 'tech@turtleopedia.com';
    user.password_hash = await util.getPasswordHash('password');
    const finalUser = await user.save();
    const body = {
      email: 'tech@turtleopdia.com',
      password: 'password',
    };
    const url = '/delta/register';
    const response = await server.post(url).send(body);
    expect(response.body.result.user.email).toEqual(body.email);
  });
  it('User Already Exist', async () => {
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
    const url = '/delta/register';
    const response = await server.post(url).send(body);
    expect(response.status).toEqual(200);
    expect(response.body.error.httpStatus).toEqual(400);
    expect(response.body.error.message).toEqual('User already found ');
  });
});
