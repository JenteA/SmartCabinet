var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('items', ['items']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname));
app.use(bodyParser.json());

//laden van pagina: data uit database wordt geladen en verstuurd
app.get('/Site', function(req, res){
	console.log('I received a GET request');
	
	db.items.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
	//db.items.find(function(err, docs){
		//console.log(docs);
		//res.json(docs);
	//});
});

//data wordt toegevoegd aan de database
app.post('/Site', function(req, res){
	console.log(req.body);
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
	var id = req.params.id;
	console.log(req.body.name);
	db.items.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {item: req.body.item, type: req.body.type}},
		new: true}, function(err, doc){
			res.json(doc);
	});
});

app.listen(3000);
console.log("Server running on port 3000");