const BCRYPT_HASH_ROUNDS = 10;
const PHONE_REGEX = /^\+[0-9]{1,4}[0-9]{10}$/;

module.exports = {
  PHONE_REGEX: PHONE_REGEX,
  BCRYPT_HASH_ROUNDS: BCRYPT_HASH_ROUNDS,
};
