var express = require('express');
var router = express.Router();
var User = require('../model/user');

router.get('/', function(req, res, next) {

	res.render('registration');
});


router.post('/', function(req, res, next) {

	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
 

 //validation
 req.checkBody('name', 'Your Name is required').notEmpty();
 req.checkBody('username', 'Your username is required').notEmpty();
 req.checkBody('email', 'Your email is required').notEmpty();
 req.checkBody('email', 'Your email should be valid').isEmail();
 req.checkBody('password', 'Your password is required').notEmpty();
 req.checkBody('password2', 'Your password is not matching' ).equals(req.body.password);
 
 var errors = req.validationErrors();

 if (errors) {
 	res.render('registration',{
 		errors: errors
 	});
 } else {
 	var newUser = new User({
 		name: name,
 		email:email,
 		username: username,
 		password: password
 	});
       
 	User.createUser(newUser, function(err, user){
         if (err) throw err;
         console.log(user);

 	});


 	res.redirect('/login');
 }



});




module.exports = router;