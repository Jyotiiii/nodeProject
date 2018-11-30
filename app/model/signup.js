var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignUp = new Schema({
    email: String,
    username : String,
    password : String,
    confirmationPassword : String
  });

  // the schema is useless so far
  // we need to create a model using it
  var signup = mongoose.model('signup', SignUp);
  
  // make this available to our users in our Node applications
  module.exports = signup;
