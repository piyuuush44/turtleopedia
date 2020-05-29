const request = require('supertest');
const app = require('../../../app');
let server;

beforeEach(() => {
  server = request(app);
});

describe('Check Health of Delta', () => {
  it('should return 200',
      async () => {
        const response = await server.get('/delta/health');
        expect(response.status)
            .toEqual(200);
      });
});
