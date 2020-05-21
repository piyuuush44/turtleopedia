const health = require('./health');
const delta = require('./delta');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(delta);

  routes.forEach((r) => {
    r.route = `/delta${r.route}`;
  });

  return routes;
};
