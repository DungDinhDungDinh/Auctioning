var mongoose = require('mongoose');

//ThingsToDo Schema
var userFollowSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	itemID: {
		type: String
	},
	giaHienTai: {
		//gia cao nhat hien tai cua item
		type: Number
	},
	trangThai: {
		//1: con dau gia
		//0: het dau gia
		type: Boolean
	}	
});


var Userfollow = mongoose.model('Userfollow', userFollowSchema);

module.exports = Userfollow