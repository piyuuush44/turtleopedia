const health = require('./health');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);

  routes.forEach((r) => {
    r.route = `/${r.route}`;
  });

  return routes;
};
