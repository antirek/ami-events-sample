var AsteriskManager = require('asterisk-manager');
var uuid = require('node-uuid');
var Q = require('q');

var ami = new AsteriskManager('5038','localhost','admin','amp111', true);  
//var ami = new AsteriskManager('5038','p02.mobilon.ru','amiadmin','kug09han', true);  
// In case of any connectiviy problems we got you coverd. 
ami.keepConnected();
 

ami.action({
  'action':'originate',
  'channel':'Local/1061@logout',
  'context':'logout2',
  'exten':'89135292926',
  'priority':1,
  'async': true,
  'actionid': 12345678,
  'variable': {
    'ORIGINATE_ACTIONID': '1234567890'
  }
}, function (err, res) {
  console.log('response', err, res);
});


ami.on('userevent', function (evt) {
	console.log('event', evt);
});