var AsteriskManager = require('asterisk-manager');

 
var ami = new AsteriskManager('5038','localhost','admin','superpassword', true);  
//var ami = new AsteriskManager('5038','p02.mobilon.ru','amiadmin','kug09han', true);  
// In case of any connectiviy problems we got you coverd. 
ami.keepConnected();
 

/* 
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

*/
/*
ami.on('managerevent', function (evt) {
//	console.log('event', evt);
})
*/



var id1 = 'lolo';
var id2 = 'lolo2';


var q = function (evt) {
	console.log('q', evt.actionid);
	if (evt.actionid == id1 || evt.actionid == id2) {
		//console.log('event', evt);
		if (evt['event'] == 'QueueParams') console.log('queue', evt.queue); 
		if (evt['event'] == 'QueueMember') console.log('queue', evt.queue, 'member', evt.location);
		if (evt['event'] == 'QueueEntry') console.log('queue', evt.queue, 'callerid', evt.callerid || evt.calleridnum);

	}
};


var h = function (evt) {
	console.log('h', evt.actionid);
	if (evt.actionid == id1 || evt.actionid == id2) {
		//console.log('event', evt);
		if (evt['event'] == 'QueueParams') console.log('queue', evt.queue); 
		if (evt['event'] == 'QueueMember') console.log('queue', evt.queue, 'member', evt.location);
		if (evt['event'] == 'QueueEntry') console.log('queue', evt.queue, 'callerid', evt.callerid || evt.calleridnum);
		if (evt['event'] == 'QueueStatusComplete') {console.log('complete'); ami.removeListener('managerevent', q);}
	}
}

ami.on('managerevent', q)
ami.on('managerevent', h)


ami.action({
  'action': 'queuestatus',
  'actionid': id1
}, function (err, res) {
	console.log('action', err, res);
	
	


});

	ami.action({
	  'action': 'queuestatus',
	  'actionid':  id2
	}, function (err, res) {
		console.log('action', err, res);
	});


