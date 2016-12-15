var mongoose = require('mongoose');

//ThingsToDo Schema
var productSchema = mongoose.Schema({
	_id:{
		type: String,
		required: true
	},
	_name:{
		type:String,
		required: true
	},
	_desciption:{
		type: String,
	},
	_startPrice: {
		type: Number,
		required: true
	},
	_endDate: {
		type: String
	},
	_image: {
		type: Array
	}
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;