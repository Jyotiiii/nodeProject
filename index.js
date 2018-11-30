
var route = require('./router');
var session = require('express-session')

var express = require('express');
var app = express();


app.use(session({secret: 'ssshhhhh'}));
// set view engine
app.set('view engine','ejs');
app.use(express.static("public"));
app.set('views', __dirname + '/view');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true}))
var port = 3212;

// middleware to use for all requests
app.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

app.use('/api',route);
app.listen(port);
console.log("port..."+port);
