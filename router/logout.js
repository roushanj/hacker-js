var express = require('express');
var router = express.Router();



router.get('/bye', function(req, res, next) {

	res.render('logout');
});

module.exports = router;