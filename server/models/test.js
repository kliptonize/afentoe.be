//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeTestSchema = new Schema({
    name: String,
    some_date: Date
});

// Compile model from schema
module.exports = mongoose.model('SomeTest', SomeTestSchema );


// // Create an instance of model SomeModel
// var awesome_instance = new SomeTest({ name: 'YOOOOOOOO!', some_date: Date.now() });

// // Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//   if (err) {
//     console.log("WTF!", err);
//   }
// })
