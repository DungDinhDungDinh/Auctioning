var mongoose = require('mongoose');

//ThingsToDo Schema
var productSchema = mongoose.Schema({
	id:{
		type: String,
		required: true
	},
	name:{
		type:String,
		required: true
	},
	desciption:{
		type: String,
	},
	startPrice: {
		type: Number,
		required: true
	},
	endDate: {
		type: String
	},
	image: {
		type: Array
	}
});


var Product = mongoose.model('Product', productSchema);

module.exports = Product;