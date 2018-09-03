const controller = require("./controller.js");
const modulePath = "/instances";

module.exports = function(router) {
  router
    .get(`${modulePath}`, controller.get)
    .post(`${modulePath}`, controller.create);

  router
    .delete(`${modulePath}/:id`, controller.remove)
    .put(`${modulePath}/:id`, controller.update)
    .get(`${modulePath}/:id`, controller.getOne);
};
