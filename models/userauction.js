var mongoose = require('mongoose');

//ThingsToDo Schema
var userAuctionSchema = mongoose.Schema({
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
	giaDaTra: {
		//gia nguoi dung da dua ra
		type: Number
	}
});


var Userauction = mongoose.model('Userauction', userAuctionSchema);

module.exports = Userauction