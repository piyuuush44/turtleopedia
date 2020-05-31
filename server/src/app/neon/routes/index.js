const health = require('./health');
const neon = require('./neon');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(neon);

  routes.forEach((r) => {
    r.route = `/neon${r.route}`;
  });

  return routes;
};
