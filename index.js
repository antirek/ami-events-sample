var AsteriskManager = require('asterisk-manager');
var uuid = require('node-uuid');
var Q = require('q');

var ami = new AsteriskManager('5038','.mobilon.ru','','', true);  
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




var queuestatus = function (amiConnection) {
	var defer = Q.defer();
	
	setTimeout(function() {
		defer.reject(new Error('timeout for get queue status'))
	}, 3000);

	var events = {
		params: [],
		members: [],
		entries: []
	};

	var actionid = uuid.v4();

	var catcher = function (evt) {
		
		if (evt.actionid == actionid) {
			if (evt['event'] == 'QueueParams') events.params.push(evt);
			if (evt['event'] == 'QueueMember') events.members.push(evt);
			if (evt['event'] == 'QueueEntry') events.entries.push(evt);
			if (evt['event'] == 'QueueStatusComplete') { 
				amiConnection.removeListener('managerevent', catcher); 
				defer.resolve(events);
			}
		};
	};

	amiConnection.on('managerevent', catcher);
	amiConnection.action({
	  'action': 'queuestatus',
	  'actionid': actionid
	}, function (err, res) {
		if (err) defer.reject(err);
		//console.log('action', err, res);
	});
	return defer.promise;
};




queuestatus(ami)
	.then(function (data) {
		console.log(data);

		var membersByQueue = function (queue, events) {
			var memberEvents = events.filter(function (item) {
				console.log(item);
				return (item.queue == queue);
			})
			return memberEvents;
		}

		var q = 'Q93588ef97fdd';
		console.log('members of', q, ':', membersByQueue(q, data.members));

	})
	.fail(function (err) {
		console.log(err);
	});


