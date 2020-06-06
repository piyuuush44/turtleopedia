const request = require('supertest');
const app = require('../../../app');
let server;

beforeEach(() => {
  server = request(app);
});

describe('Check Contact Us', () => {
  it('Working correctly',
      async () => {
        const url = '/delta/contactus';
        const body = {
          name: 'mv',
          email: 'abc@abc.com',
          message: 'testing api',
        };
        const response = await server.post(url).send(body);
        expect(response.status).toEqual(200);
        expect(response.body.message)
            .toEqual('Thanks for Contacting Us, We will reply back shortly!');
      });
});
