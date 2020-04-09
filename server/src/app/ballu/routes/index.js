const health = require('./health');
const auth = require('./auth');

module.exports = () => {
  let routes = [];

  routes = routes.concat(health);
  routes = routes.concat(auth);

  routes.forEach((r) => {
    r.route = `/ballu${r.route}`;
  });

  return routes;
};
