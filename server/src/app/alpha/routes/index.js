const auth = require('./auth');
// const dashboard=require('./dashboard');

module.exports = () => {
  let routes = [];

  routes = routes.concat(auth);

  routes.forEach((r) => {
    r.route = `/alpha${r.route}`;
  });

  return routes;
};
