const health = require('./health');
const auth = require('./auth');
const quiz = require('./quiz');
const questions = require('./question');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(auth);
  routes = routes.concat(quiz);
  routes = routes.concat(questions);

  routes.forEach((r) => {
    r.route = `/helium${r.route}`;
  });

  return routes;
};
