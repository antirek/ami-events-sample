var AsteriskManager = require('asterisk-manager');

var ami = new AsteriskManager('5038','localhost','admin','amp111', true); 
 
// In case of any connectiviy problems we got you coverd. 
ami.keepConnected();
 
// Listen for any/all AMI events. 
ami.on('managerevent', function (evt) {
  console.log(evt);
});