var mongoose = require('mongoose');

//ThingsToDo Schema
var userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	admin:{
		type: Boolean,
		required: true
	},
	subscribeProducts: {
		type: Array,
	}
});


var User = mongoose.model('User', userSchema);

module.exports = User;