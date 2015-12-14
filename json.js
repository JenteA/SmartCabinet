var SerialPort = require("serialport");
var scraper = require('json-scrape')();
var woord;
var woord2;

//SerialPort.list( function (err, ports) { console.log(ports); });

var arduino = new SerialPort.SerialPort('/dev/tty.usbmodem1421', {baudrate: 9600}, {parser: SerialPort.parsers.readline("\n")}, false); //you must set the port and baudrate

arduino.on('data', function (data) {
	//var buf = new Buffer(indata, 'utf-8');
	//console.log(indata.toString('ascii'));
    //console.log(indata.toString());
    //scraper.write(indata.toString());
    console.log(data.toString());
    if(data.toString="{heeeey}")
    {
    	console.log("test");
    }
});

scraper.on('data', function (cleandata) {
    //console.log(cleandata);
    //console.log(cleandata.A0);
});

