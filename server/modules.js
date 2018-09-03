const instanceModule = require("./instances/module.js");
const express = require("express");
const router = express.Router();

module.exports = () => {
  instanceModule(router);

  return router;
};
