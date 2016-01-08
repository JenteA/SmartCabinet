var SerialPort = require("serialport").SerialPort;
var serialport = new SerialPort("/dev/cu.usbserial-A900JI7K",{baudrate:9600});
serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
      console.log(String.fromCharCode(data[0]));
  });
});
/*
var data = "hello";

function writeAndDrain (data, callback) {
  sp.write(data, function () {
    sp.drain(callback);
  });
}*/

function callback(error){
if(error)
	throw error;

}

