const BCRYPT_HASH_ROUNDS = 10;
const PHONE_REGEX = /^\+[0-9]{1,4}[0-9]{10}$/;
const BLOG_POST_CATEGORIES = [
  'technology',
  'lifestyle',
  'entertainment',
  'review',
  'management',
  'caseAnalysis',
];
const DELTA_POSTS_PAGINATED_URL = 'https://api.turtleopedia.com/delta/posts?';
const DELTA_CATEGORY_PAGINATED_URL = 'https://api.turtleopedia.com/delta/filterPosts?';
const USER_STAGE_CATEGORIES = ['pending', 'approved', 'disabled'];
const GCS_URL = 'https://storage.googleapis.com';


module.exports = {
  PHONE_REGEX: PHONE_REGEX,
  BCRYPT_HASH_ROUNDS: BCRYPT_HASH_ROUNDS,
  BLOG_POST_CATEGORIES: BLOG_POST_CATEGORIES,
  DELTA_POSTS_PAGINATED_URL: DELTA_POSTS_PAGINATED_URL,
  DELTA_CATEGORY_PAGINATED_URL: DELTA_CATEGORY_PAGINATED_URL,
  USER_STAGE_CATEGORIES: USER_STAGE_CATEGORIES,
  GCS_URL: GCS_URL,
};
