var mongoose = require('mongoose');

//ThingsToDo Schema
var userSchema = mongoose.Schema({
	ID: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	ten: {
		type: String
	},
	avatar: {
		type: String
	},
	soDienThoai: {
		type: String
	},
	ngaySinh: {
		type: String
	},
	gioiTinh: {
		//---nam/nu/rong
		type: String
	},
	diaChi: {
		type: String
	}
});


var User = mongoose.model('User', userSchema);

module.exports = User;