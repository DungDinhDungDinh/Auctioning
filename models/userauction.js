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
	giaDaTra: {
		//gia nguoi dung da dua ra
		type: Number
	}
});


var Userauction = mongoose.model('Userauction', userAuctionSchema);

module.exports = Userauction