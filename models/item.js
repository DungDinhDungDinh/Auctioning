var mongoose = require('mongoose');

//ThingsToDo Schema
var itemSchema = mongoose.Schema({
	ID:{
		type: String,
		required: true
	},
	ten:{
		type:String,
		required: true
	},
	hinhAnh:{
		//link hinh
		type: String,
	},
	chuyenMuc: {
		//loai item
		type: String
	},
	giaKhoiDiem: {
		type: Number
	},
	giaHienTai: {
		type: Number
	},
	ngayTao: {
		type: Date
	},
	ngayHetHan: {
		//ngay va gio: dd/mm/yyyy hh:mm
		type: Date
	},
	trangThai: {
		//con thoi gian dau gia: 1
		//het thoi gian dau gia: 0
		type: Boolean
	},
	noiBan: {
		type: String
	},
	vanChuyen: {
		type: String
	},
	moTa: {
		type: String
	},
	nguoiBan: {
		//ID nguoi ban
		type: String
	},
	nguoiTra: {
		//ID nguoi tra gia cao nhat - Co the rong
		type: String
	}
});


var Item = mongoose.model('Item', itemSchema);

module.exports = Item;