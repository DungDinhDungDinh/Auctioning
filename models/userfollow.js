var mongoose = require('mongoose');

//ThingsToDo Schema
var userFollowSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String
	}
});


var Userfollow = mongoose.model('Userfollow', userFollowSchema);

module.exports = Userfollow