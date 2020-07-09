const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const constants = require('./constants');
const saltRounds = constants.BCRYPT_HASH_ROUNDS;

/**
 * Signs and returns the jwt token
 * @param {Object} data : data to encrypt
 * @param {String} privateKey : key used to sign
 * @param {BigInteger} expiry : validity of the token
 * @return {string}: returns the final token after signing
 */
const signJwt = (data, privateKey, expiry) => {
  const payload = {
    data: data,
  };
  if (expiry) {
    payload.exp = expiry;
  }
  return jwt.sign(payload, privateKey);
};

exports.signJwt = signJwt;

exports.verifyJwt = (token, privateKey) => jwt.verify(token, privateKey);

/**
 * Get the expiration time for JWT, which is seconds since epoch
 * that are sixty days from today.
 *
 * @return {Number} seconds since epoch that are sixty days
 * in future from today.
 */
function getJwtExpirationTime() {
  return Math.floor(Date.now() / 1000) + (60 * 24 * 60 * 30);
}

exports.getJwtExpirationTime = getJwtExpirationTime;

/**
 * Get the expiration time for JWT, which is seconds since epoch
 * that are sixty days from today.
 *
 * @param {Object} req - Express request object
 * @return {Number} seconds since epoch that are sixty days in
 * future from today.
 */
function extractAccessToken(req) {
  let token = null;
  if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
    [, token] = req.headers.authorization.split(' ');
  } else if (req.query && req.query.token) {
    token = req.query.token; // eslint-disable-line prefer-destructuring
  } else if (req.cookies && req.cookies['access-token']) {
    token = req.cookies['access-token'];
  }
  return token;
}

exports.extractAccessToken = extractAccessToken;

/**
 * Convert a password string to hash using bcrypt
 * @param {String} password - password string to convert
 * @return {String} hash - hash encoded password
 */
exports.getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};
