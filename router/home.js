var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	res.render('home');
});

router.get('/user', function(req, res, next) {

	res.render('user');
});

router.get('/login', function(req, res, next) {

	res.render('login');
});

router.get('/logout', function(req, res, next) {

	res.render('logout');
});

router.get('/registration', function(req, res, next) {

	res.render('registration');
});

module.exports = router;