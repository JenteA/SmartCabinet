var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/items', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to mongodb');
	}
});

var uitItemSchema = mongoose.Schema({
	id: [(type: mongoose.Schema.types.ObjectID, ref: 'Item')],
	Naam: String
});

var Uitgeleend = mongoose.model('Uitgeleend', uitItemSchema);
module.exports = Uitgeleend;