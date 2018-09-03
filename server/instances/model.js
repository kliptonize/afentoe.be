const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstanceSchema = new Schema({
  verb: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum : ['COUNT_DOWN','COUNT_UP', 'MESSAGE'],
    default: 'COUNT_UP'
  }
}, {
  timestamps: true,
  toObject: {
    transform: function (doc, ret, game) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

InstanceSchema.index({verb: 1, subject: 1}, {unique: true});

// Compile model from schema
module.exports = mongoose.model('Instance', InstanceSchema );