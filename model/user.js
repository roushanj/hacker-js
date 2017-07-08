var mongoose  = require('mongoose');
var bcrypt = require('bcryptjs');
var compare = require('secure-compare');
var UserSchema = mongoose.Schema({

	username:{
		type: String,
		index:true
	},
	name:{
		type: String,
		index:true
	},
	email:{
		type: String,
		index:true
	},
	password:{
		type: String,
		index:true
	}
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser, callback) {
         
         newUser.save(callback);
}

module.exports.getUserByUsername = function (username, callback) {
	var query = {username: username};
	User.findOne(query, callback); 
}

module.exports.getUserById = function (id, callback) {
	
	User.findById(id, callback); 
}

module.exports.comparePassword = function (candidatePassword, callback) {
	compare(candidatePassword, function (err, isMatch) {

		if (err) throw err;
		callback(null, isMatch);
	});
}