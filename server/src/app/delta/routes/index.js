const health = require('./health');
const posts = require('./posts');
const website = require('./website');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(posts);
  routes = routes.concat(website);

  routes.forEach((r) => {
    r.route = `/delta${r.route}`;
  });

  return routes;
};
