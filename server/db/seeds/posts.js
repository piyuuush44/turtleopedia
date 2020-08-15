const path = require('path');
const fs = require('fs');
const Posts = require('../../src/models/posts');

module.exports = async (uId) => {
  try {
    // Add user
    const filePath = path.join(__dirname, '../files/posts.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    await Promise.all(JSON.parse(content)
        .map(async (s) => {
          await addPost(s, uId);
        }));
  } catch (e) {
    throw new Error(e);
  }
};

const addPost = async (data, uId) => {
  const post = new Posts();
  post.title = data.title;
  post.category = data.category;
  post.content = data.content;
  post.is_top = data.is_top;
  post.image_url = data.image_url;
  post.slug_url = data.slug_url;
  post.feature_content = data.feature_content;
  post.tags = data.tags;
  post.user_id = uId;

  return await post.save();
};
