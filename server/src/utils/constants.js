const BCRYPT_HASH_ROUNDS = 10;
const PHONE_REGEX = /^\+[0-9]{1,4}[0-9]{10}$/;
const BLOG_POST_TYPES = ['technology', 'lifestyle'];
module.exports = {
  PHONE_REGEX: PHONE_REGEX,
  BCRYPT_HASH_ROUNDS: BCRYPT_HASH_ROUNDS,
  BLOG_POST_TYPES: BLOG_POST_TYPES,
};
