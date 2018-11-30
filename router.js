var express = require('express');
var app = express.Router();
var SignIn = require('./app/model/signin');
var SignUp = require('./app/model/signup');
var jwt = require('jsonwebtoken');


app.get('/login',function(req,res,next){
    console.log("in get api");
    res.render('login.ejs');
})
app.post('/login',function(req,res,next){
    console.log("in post route");
    var signup = new SignUp();      // create a new instance of the Bear model
    console.log("signups"+signup);
    var mongoQuery = {
        $and:[{'username': req.body.username},{password: req.body.password}]
    }
    console.log(mongoQuery);
     // save the bear and check for errors
   
     SignUp.find(mongoQuery, function (err, result)  {
        console.log(result)
        if(err){
            console.log("error"+err);

            res.redirect("/login");
        } 
        else {
            req.session.userData = result[0];
            var data = req.session.userData;
            console.log("jyotiiii")
            console.log(req.session);
            console.log("profile route")
            res.redirect("/api/profile");
        }
    })
});
app.get('/signup',function(req,res,next){
  console.log("in get api");
  res.render('signup.ejs');
})

app.post('/signup',function(req,res,next){
    SignUp.findOne({username: req.body.username}, function (err, result) {
        if(err){
            console.log('error_msg', "Something went wrong, please try again");
            res.send("Something went wrong, please try again");
        }else if(result){
            console.log('error_msg', "Email id or Username already exists");
            res.send("Email id or Username already exists");
        }
        else{
            console.log("in post route");
            var signup = new SignUp();      // create a new instance of the Bear model
            signup.email = req.body.email; 
            signup.username = req.body.username;  // set the bears name (comes from the request)
            signup.password = req.body.password;
            signup.confirmationPassword = req.body.confirmationPassword
            console.log(signup);
            // save the bear and check for errors
            try{
                signup.save(function(err) {
                    if (err)
                        res.send(err);
                        res.json({ message: 'successfully registration!' });
                });
            }catch(e){
                console.log(e)
            }
        }
    });
});    
app.get('/profile', function (req, res) {
    var userValue = req.session.userData;
    console.log("in profile")
    console.log(userValue);
    SignUp.find({"username" : userValue.username}, {password:0,confirmationPassword:0}).exec(function(err, users) {   
        if (err) throw err;
        res.render('profile.ejs', { "users": users });
    });
});
module.exports = app;
