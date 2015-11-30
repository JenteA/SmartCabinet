var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//server.listen(3000);
mongoose.connect('mongodb://localhost/items', function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('Connected to db.');
	}
});

var itemSchema = new Schema({
	item: String,
	quantity: Number
});

var Item = mongoose.model('Item', itemSchema);
	











/**
 * @author Ziggy
 */
