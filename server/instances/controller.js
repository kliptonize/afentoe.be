const service = require("./service");

const create = (req, res, next) => {
  service.create(req.body)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(next);
};

const update = (req, res, next) => {
  service.update(req.params.id, req.body)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(next);
};

const get = (req, res, next) => {
  service.get({})
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(next);
};

const getOne = (req, res, next) => {
  service.getOne(req.params.id)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(next);
};

const remove = (req, res, next) => {
  service.remove(req.params.id)
    .then(doc => {
      res.status(204).send({});
    })
    .catch(next);
};

module.exports = {
  get,
  getOne,
  remove,
  create,
  update,
};