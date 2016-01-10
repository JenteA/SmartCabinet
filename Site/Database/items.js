var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/items', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to mongodb');
	}
});

var itemSchema = mongoose.Schema({
	item : {
		type: String,
		required: true
	},
	type : {
		type: String,
		required: true
	},
	id : {
		type: String,
		required: true
	},
	State : {
		type: Boolean
	},
	NaamPersoon : {
		type: String
	}
});

var Items = mongoose.model('Item', itemSchema);
module.exports = Items;