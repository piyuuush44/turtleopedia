const request = require('supertest');
const app = require('../../../app');
let server;

beforeEach(() => {
  server = request(app);
});

describe('Check Subscription', () => {
  it('Working correctly',
      async () => {
        const url = '/delta/subscribe';
        const body = {
          email: 'abc@abc.com',
        };
        const response = await server.post(url).send(body);
    //  console.log(response.status);
    //  console.log(response.body);
          expect(response.status).toEqual(200);
        expect(response.body.message)
           .toEqual('Subscribed Successfully! ');
      });
});
