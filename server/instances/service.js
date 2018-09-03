const model = require("./model");

const create = body => {
  return new model(body).save();
}

const update = (id, newBody) => {
  return model.findOneAndUpdate({_id: id}, newBody, {upsert:true});
}

const remove = (id) => {
  return model.findOneAndRemove({_id: id});
}

const get = qry => model.find(qry);
const getOne = id => model.find({_id: id});

module.exports = {
  create,
  update,
  remove,
  get,
  getOne,
}