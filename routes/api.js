var express = require('express');
var router = express.Router();

var Serial_xbee = require("serialport").SerialPort
var prarail_charset = ["/", "0","1","2","3","4","5"];
var serial_xbee = new Serial_xbee("/dev/tty.usbserial-A800cAlP", {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});
module.exports.serial_xbee = serial_xbee
serial_xbee.on("open", function () {
    console.log("open serial_xbee")
});

/* GET home page. */
router.get('/shake', function(req, res) {
	var shake = 0;
	shake = req.query.shake;
	console.log("shake = "+shake)
	var write_code = setWriteCode(shake);
	console.log("writecode = "+write_code)
	serial_xbee.write(write_code,function(){
		console.log("emitted. shake = "+write_code);
	})

  res.send({
  	shake:shake
  });
});

function setWriteCode(shake){
	if(shake < 200){
		return prarail_charset[0]
	}
	if(shake < 600){
		return prarail_charset[3]
	}
	else {
		return prarail_charset[6]
	}
}

module.exports = router;
