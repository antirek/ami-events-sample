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





var queuestatus = function (callback) {

	var queue_evts = {
		params: [],
		members: [],
		entries: []
	};

	var actionid = 'jdfkgjdkf';

	var catcher = function (evt) {
		if (evt.actionid == actionid) {
			if (evt['event'] == 'QueueParams') queue_evts.params.push(evt);
			if (evt['event'] == 'QueueMember') queue_evts.members.push(evt);
			if (evt['event'] == 'QueueEntry') queue_evts.entries.push(evt);
			if (evt['event'] == 'QueueStatusComplete') { 
				ami.removeListener('managerevent', catcher); 
				callback(queue_evts);
			}
		};
	};

	ami.on('managerevent', catcher);
	ami.action({
	  'action': 'queuestatus',
	  'actionid': actionid
	}, function (err, res) {
		console.log('action', err, res);
	});
};

queuestatus(function (arr) {
	console.log(arr);
});