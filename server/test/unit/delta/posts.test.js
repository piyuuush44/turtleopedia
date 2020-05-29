const request = require('supertest');
const app = require('../../../app');
const Posts = require('../../../src/app/delta/models/posts');
let server;

beforeEach(() => {
  server = request(app);
});
//
// describe('Check postPost for all categories', () => {
//   it('should return 200 for successful post entry to db',
//       async () => {
//         const url = '/delta/posts';
//         const response = await server.post(url)
//             .send({
//               title: 'title',
//               content: [],
//               category: 'technology',
//             });
//         expect(response.status)
//             .toEqual(200);
//       });
// });

describe('getPostById', () => {
  it('should return 200 for successful post entry to db',
      async () => {
        const post = new Posts();
        post.title = 'hi';
        post.category = 'technology';
        post.content = [];

        const posts = await post.save();
        console.log(posts);
        expect(posts.title)
            .toEqual('hi');
      });
});
