var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	mongoose = require('mongoose');
	
server.listen(3000);

mongoose.connect('mongodb://localhost/items', function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Connected to mongodb');
	}
});

var itemSchema = mongoose.Schema({
	item : String,
	type : String
});

var Items = mongoose.model('Item', itemSchema);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});



io.sockets.on('connection', function(socket){

	socket.on('send item', function(data){
		var itm = data.item.trim();
		var typ = data.type.trim();
		console.log(data.type);
		var newItem = new Items({item: itm, type: typ });
		newItem.save(function(err){
			if (err) throw err;
			if (err) return console.error(err);
	
	});
	});
});
