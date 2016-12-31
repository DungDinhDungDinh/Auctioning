var mongoose = require('mongoose');

//ThingsToDo Schema
var notificationSchema = mongoose.Schema({
	itemID: {
		type: String,
		required: true
	},
	userID: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
});


var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification