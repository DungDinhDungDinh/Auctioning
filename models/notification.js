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
	//tên item, để không cần gọi api lấy tên item trên client
	name: {
		type: String,
		required: true
	},
	thoiGian: {
		type: String,
		required: true
	},
	//trạng thái của item 1 nếu còn hạn đấu giá, 0 nếu hết hạn đấu giá
	status: {
		type: Boolean,
		required: true
	},
	seen :  {
		type: Boolean,
		required: true
	},
	//định danh noti để xóa
	ID: {
		type: String,
		required: true
	}
});


var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification