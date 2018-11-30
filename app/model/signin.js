
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema;

var SignIn = new Schema({
    username: String,
    password : String
  });

  // the schema is useless so far
  // we need to create a model using it
  var signin = mongoose.model('signin', SignIn);
  
  // make this available to our users in our Node applications
  module.exports = signin;


