var mongoose = require('mongoose');

//ThingsToDo Schema
var accountSchema = mongoose.Schema({
	ID: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});


var Account = mongoose.model('Account', accountSchema);

module.exports = Account