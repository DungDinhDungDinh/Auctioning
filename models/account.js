var mongoose = require('mongoose');

//ThingsToDo Schema
var userSchema = mongoose.Schema({
	ID: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
});


var User = mongoose.model('User', userSchema);

module.exports = User;