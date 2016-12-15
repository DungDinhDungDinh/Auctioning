var mongoose = require('mongoose');

//ThingsToDo Schema
var userSchema = mongoose.Schema({
	_userName:{
		type: String,
		required: true
	},
	_passWord:{
		type: String,
		required: true
	},
	_admin:{
		type: String,
		required: true
	},
	_subscribeProducts: {
		type: Array,
	}
});


var User = mongoose.model('User', userSchema);

module.exports = User;