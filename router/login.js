var express = require('express');
var router = express.Router();
var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
var User=require('../model/user')

router.get('/new', function(req, res, next) {

	res.render('login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   
   User.getUserByUsername(username, function(err, user) {
   	  
   	  if (err) throw err;
   	  if (!user) {
   	  	return done(null, false, {message: 'Unknow User'});

   	  }

   	  User.comparePassword(password, user.password,function (err, isMatch) {
   	     if (err) throw err;
   	     if (isMatch) {
   	     	return done(null, user);

   	     }else {
            return done(null, false, {message:'Invalid password'});
   	     }
   	  });
   });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/new',
  passport.authenticate('local', {succesRedirect:"/", failureRedirect:"/registration"}),
  function(req, res) {

  	res.redirect('/');
            
  });


module.exports = router;