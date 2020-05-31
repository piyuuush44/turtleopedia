const request = require('supertest');
const app = require('../../../app');
const Posts = require('../../../src/app/delta/models/posts');

const server = request(app);

beforeEach(() => {
// it runs before each block
});

afterEach(async () => {
  // deleting the created new post after every test case
  await Posts.deleteMany();
});

describe('Create a new Post /delta/posts', () => {
  it('should return 200 for successful post entry to db',
      async () => {
        const url = '/delta/posts';
        const body = {
          title: 'title',
          content: [],
          category: 'technology',
        };
        const response = await server.post(url)
            .send(body);

        expect(response.status)
            .toEqual(200);

        expect(response.body.result.post.title).toEqual(body.title);
        expect(response.body.result.post.content).toEqual(body.content);
        expect(response.body.result.post.category).toEqual(body.category);
      });
});

describe('getPostById', () => {
  it('should return 200 for for id passed in parameter of a post',
      async () => {
        const post = new Posts();
        post.title = 'hi';
        post.category = 'technology';
        post.content = [];

        const posts = await post.save();

        const url = `/delta/post/${posts._id}`;

        const response = await server.get(url);

        // console.log(response.body);
        expect(response.status)
            .toEqual(200);
        expect(response.body.result.post._id).toMatch(posts._id.toString());
        expect(response.body.result.post.title).toEqual(posts.title);
        expect(response.body.result.post.category).toEqual(posts.category);
      });

  it('should return error that no post is found for the given id', async () => {
    const url = `/delta/post/5ed0d2e7f74f3838222a8d31`;

    const response = await server.get(url);
    expect(response.status)
        .toEqual(200);
    expect(response.body.error.httpStatus).toEqual(400);
  });
});


describe('should update a post -> putUpdatePostById', () => {
  it('should update the post by ID ', async () => {
    const post = new Posts();
    post.title = 'hi';
    post.category = 'technology';
    post.content = [];

    const posts = await post.save();

    const url = `/delta/post/${posts._id}`;

    const body = {
      title: 'final value',
      category: 'technology',
      content: [],
    };

    const response = await server.put(url).send(body);
    // console.log(response.body);

    expect(response.status)
        .toEqual(200);
    expect(response.body.result.post.title).toEqual(body.title);
    expect(response.body.result.post.category).toEqual(body.category);
    expect(response.body.result.post._id).toEqual(posts._id.toString());
  });
  it('should return error that no post is found for the given id to update',
      async () => {
        const url = `/delta/post/5ed0d2e7f74f3838222a8d31`;

        const body = {
          title: 'final value',
          category: 'technology',
          content: [],
        };
        const response = await server.put(url).send(body);
        expect(response.status)
            .toEqual(200);
        expect(response.body.error.httpStatus).toEqual(400);
      });
});

describe('should delete a post -> deletePostById', () => {
  it('delete a post by id', async () => {
    const post = new Posts();
    post.title = 'hi';
    post.category = 'technology';
    post.content = [];

    const posts = await post.save();
    const url = `/delta/post/${posts._id}`;
    const response = await server.delete(url);

    // console.log(response.body);
    expect(response.status)
        .toEqual(200);
  });
  it('should return error that no post is found for the given id', async () => {
    const url = `/delta/post/5ed0d2e7f74f3838222a8d31`;

    const response = await server.delete(url);
    expect(response.status)
        .toEqual(200);
    expect(response.body.error.httpStatus).toEqual(400);
  });
});
