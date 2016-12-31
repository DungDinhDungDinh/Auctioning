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
	thoiGian: {
		type: String,
		required: true
	},
	noiDung: {
		type: String,
		required: true
	},
	seen :  {
		type: Boolean,
		required: true
	},
	ID: {
		type: String,
		required: true
	}
});


var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification