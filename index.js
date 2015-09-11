var AsteriskManager = require('asterisk-manager');
var uuid = require('node-uuid');
var Q = require('q');

var ami = new AsteriskManager('5038','localhost','admin','superpassword', true);  
//var ami = new AsteriskManager('5038','p02.mobilon.ru','amiadmin','kug09han', true);  
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

ami.on('agentconnect', function (evt) {
  console.log('agentconnect', evt);
});

ami.on('agentcomplete', function (evt) {
  console.log('agentcomplete', evt);
});

ami.on('agentringnoanswer', function (evt) {
  console.log('agentringnoanswer', evt);
});

ami.on('join', function (evt) {
  console.log('join', evt);
});

ami.on('leave', function (evt) {
  console.log('leave', evt);
});

ami.on('queuecallerabandon', function (evt) {
  console.log('queuecallerabandon', evt);
});

ami.on('queuecallerjoin', function (evt) {
  console.log('queuecallerjoin', evt);
});

ami.on('queuecallerleave', function (evt) {
  console.log('queuecallerleave', evt);
});

ami.on('managerevent', function (evt) {
//	console.log('event', evt);
});