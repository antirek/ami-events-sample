var AsteriskManager = require('asterisk-manager');

 
var ami = new AsteriskManager('5038','localhost','admin','superpassword', true);  
// In case of any connectiviy problems we got you coverd. 
ami.keepConnected();
 
// Listen for any/all AMI events. 
ami.on('dial', function (evt) {
  console.log('dial', evt.channel, evt.dialstatus, evt.destination, evt.dialstring);
});

ami.on('bridge', function (evt) {
  console.log('bridge', evt.channel1, evt.callerid1, evt.channel2, evt.callerid2);
});

ami.on('hangup', function (evt) {
  console.log('hangup', evt.channel, evt.dialstatus, evt.destination);
});

ami.on('agentcalled', function (evt) {
  console.log('agentcalled', evt);
});