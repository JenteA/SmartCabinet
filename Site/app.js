var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('items', ['items']);
var users = mongojs('items', ['users']);
var bodyParser = require('body-parser');
var SerialPort = require("serialport"),
serialport = SerialPort.SerialPort;

var prodId = "";
var charID = "";

var myPort = new serialport("/dev/cu.usbserial-A900JI7K",{baudrate:9600, parser: SerialPort.parsers.readline("\r\n")});
myPort.on('open', function(){
	console.log("Hier zit ik ook in");
	myPort.on('data', function(data){
		if(data != "")
		{
			prodId = data;
		}
		
		//console.log(prodId);
	});
});

app.use(express.static(__dirname));
app.use(bodyParser.json());




//laden van pagina: data uit database wordt geladen en verstuurd
app.get('/Site', function(req, res){
	console.log('I received a GET request');
	
	db.items.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/Site/login', function(req, res){
	console.log('I received a GET request');
	
	db.users.find(function(err, dbUsers){
		console.log(dbUsers);
		res.json(dbUsers);
	});
});


//data wordt toegevoegd aan de database
app.post('/Site', function(req, res){
	console.log("post request");
	console.log(prodId);
	var productID = prodId;
	console.log(productID);
	prodId = "";
	req.body.id = productID;

	db.items.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

//data verwijderen uit de database
app.delete('/Site/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.items.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

//1 file selecteren uit de database om aan te passen
app.get('/Site/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.items.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

//geselecteerde file aanpassen en wegschrijven naar de database
app.put("/Site/:id", function(req, res){
	console.log("ik zit in de verkeerde");
	var id = req.params.id;
	console.log(req.body.name);
	db.items.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {item: req.body.item, type: req.body.type}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

app.put("/Site/uitlenen", function(req, res) {
	console.log("ik ga uitlenen");
	var productID = prodId;
	var item = db.items.findOne({id: productID});
	if(item.State == false)
	{
		db.items.findAndModify({query: {id: productID}, update: {$set: {State: true}}}, function(er, doc){
			res.json(doc);
		});
	}
});

app.put("/Site/terugbrengen", function(req, res) {
	console.log("ik ga terugbrengen");
	var productID = prodId;
	var item = db.items.findOne({id: productID});
	if(item.State == true)
	{
		db.items.findAndModify({query: {id: productID}, update: {$set: {State: false}}}, function(er, doc){
			res.json(doc);
		});
	}
});

app.listen(3000);
console.log("Server running on port 3000");