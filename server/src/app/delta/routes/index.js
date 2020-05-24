const health = require('./health');
const posts = require('./posts');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(posts);

  routes.forEach((r) => {
    r.route = `/delta${r.route}`;
  });

  return routes;
};
