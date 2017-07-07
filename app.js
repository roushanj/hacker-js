var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
//var mongo = require('mongodb');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/super');
//var db = mongoose.connection;

var user = require('./router/user');
var home = require('./router/home');
var registration = require('./router/registration');
var logout = require('./router/logout');
var login = require('./router/login');

var app = express();


//default layouts DIR

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, ('semantic/dist'))));

//Middleware 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



// Express Validator

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', home);
app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/registration', registration);

module.exports = app;