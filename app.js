var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser= require('cookie-parser');
var exphbs = require('express-handlebars');
var flash= require('connect-flash');
var session= require('express-session');
var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacker');
var db = mongoose.connection;

var user = require('./router/user');
var home = require('./router/home');
var registration = require('./router/registration');
var logout = require('./router/logout');
var login = require('./router/login');

var app = express();


//default layouts DIR

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','handlebars');
app.engine('handlebars', exphbs({defaultLayout: null}));

app.use(express.static(path.join(__dirname, ('semantic/dist'))));

//Middleware 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//Express Session

app.use(session({
     secret: 'secret',
     resave: false,
     saveUninitialized: true,
     cookie: { secure: true }
}));


app.use(passport.initialize());
app.use(passport.session());


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


app.use(flash());
app.use(function(req, res, next){
    
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     next();

});

app.use('/', home);
app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/registration', registration);

module.exports = app;