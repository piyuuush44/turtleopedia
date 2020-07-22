const request = require('supertest');
const app = require('../../../app');
const Posts = require('../../../src/models/posts');
const setup = require('../setup');
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
        const {mockedServer, token} = await setup.setupMocksAndServer();
        const url = '/delta/posts';
        const body = {
          title: 'title',
          content: [],
          category: 'technology',
          slug_url: 'abcdef',
          feature_content: 'abc',
        };
        const response = await mockedServer.post(url)
            .send(body).set({
              Authorization: token,
            });

        expect(response.status)
            .toEqual(200);
        expect(response.body.result.post.slug_url).toEqual(body.slug_url);
        expect(response.body.result.post.feature_content)
            .toEqual(body.feature_content);
        expect(response.body.result.post.title).toEqual(body.title);
        expect(response.body.result.post.content).toEqual(body.content);
        expect(response.body.result.post.category).toEqual(body.category);
      });
});

describe('getPostById', () => {
  it('should return 200 for for id passed in parameter of a post',
      async () => {
        const {mockedServer, token, user} = await setup.setupMocksAndServer();
        const post = new Posts();
        post.title = 'hi';
        post.category = 'technology';
        post.content = [];
        post.user_id = user._id;
        // post.no_of_views=post.no_of_views;

        const posts = await post.save();

        const url = `/delta/post/${posts._id}`;

        const response = await mockedServer.get(url).set({
          Authorization: token,
        });

        expect(response.status)
            .toEqual(200);
        expect(response.body.result.post.no_of_views)
            .toEqual((posts.no_of_views + 1));
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
    const {mockedServer, token, user} = await setup.setupMocksAndServer();
    const post = new Posts();
    post.title = 'hi';
    post.category = 'technology';
    post.content = [];
    post.user_id = user._id;

    const posts = await post.save();

    const url = `/delta/post/${posts._id}`;

    const body = {
      title: 'final value',
      category: 'technology',
      content: [],
    };

    const response = await mockedServer.put(url).send(body).set({
      Authorization: token,
    });

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
    const {mockedServer, token, user} = await setup.setupMocksAndServer();
    const post = new Posts();
    post.title = 'hi';
    post.category = 'technology';
    post.content = [];
    post.user_id = user._id;
    const posts = await post.save();
    const url = `/delta/post/${posts._id}`;
    const response = await mockedServer.delete(url).set({
      Authorization: token,
    });

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


describe('should get a posts by category -> getFilterPost', () => {
  it('should get the posts by category ', async () => {
    const {mockedServer, token, user} = await setup.setupMocksAndServer();
    const post = new Posts();
    post.title = 'hi';
    post.category = 'technology';
    post.content = [];
    post.user_id = user._id;
    const posts = await post.save();
    const url = `/delta/filterPosts?category=${posts.category}`;
    const response = await mockedServer.get(url).set({
      Authorization: token,
    });
    expect(response.status)
        .toEqual(200);
    expect(response.body.results[0].category).toEqual(posts.category);
    expect(response.body.results[0].title).toEqual(posts.title);
  });
  it('should return zero post if is_active is false ',
      async () => {
        const url = `/delta/filterPosts`;
        const {mockedServer, token, user} = await setup.setupMocksAndServer();
        const post = new Posts();
        post.title = 'hi';
        post.is_active = false;
        post.category = 'technology';
        post.content = [];
        post.user_id = user._id;
        await post.save();

        const response = await mockedServer.get(url).set({
          Authorization: token,
        });
        expect(response.status)
            .toEqual(200);
        expect(response.body.results.length).toEqual(0);
      });
  it('should return post successfully if is_active is true ',
      async () => {
        const url = `/delta/filterPosts`;
        const {mockedServer, token, user} = await setup.setupMocksAndServer();
        const post = new Posts();
        post.title = 'hi';
        post.is_active = true;
        post.category = 'technology';
        post.content = [];
        post.user_id = user._id;
        const posts = await post.save();

        const response = await mockedServer.get(url).set({
          Authorization: token,
        });
        expect(response.status)
            .toEqual(200);
        expect(response.body.results.length).toEqual(1);
        expect(response.body.results[0].is_active).toEqual(true);
        expect(response.body.results[0].title).toEqual(posts.title);
      });
  it('should return error that no post is found for the given category',
      async () => {
        const url = `/delta/filterPosts`;

        const response = await server.get(url);
        expect(response.status)
            .toEqual(200);
        expect(response.body.results.length).toEqual(0);
      });


//  todo jayant add test case when limit is one offset is zero
//    todo add test case when limit is one offset is one
//    todo add test when more than one category are passed to this api
});
