const health = require('./health');
const posts = require('./posts');
const auth = require('./auth');
module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(posts);
  routes = routes.concat(auth);
  
  routes.forEach((r) => {
    r.route = `/delta${r.route}`;
  });

  return routes;
};
