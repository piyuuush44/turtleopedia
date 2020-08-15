require('../../src/config/db');

const logger = require('../../src/config/logger');

const userSeed = require('./user');
const postSeed = require('./posts');

const index = async () => {
  const users = await userSeed();
  await Promise.all(users.map(async (c) => {
    await postSeed(c._id);
  }));
};

index()
    .then(
        (r) => {
          process.exit(0);
        },
    )
    .catch(
        (e) => {
          logger.error(e);
          process.exit(1);
        },
    );
