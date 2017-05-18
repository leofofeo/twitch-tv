//JS and jQuery for RQ
$('document').ready(function(){
	
	for(var i = 0; i < channels.length; i++){
		callTwitchAPI(channels[i], i);	
	}
});

var channels = ["ESL_SC2", 
"OgamingSC2", 
"cretetion", 
"freecodecamp", 
"storbeck", 
"habathcx", 
"RobotCaleb",
"KindaFunnyGames",
"ign"
]


var callTwitchAPI = function(channel, counter){
	$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+ channel+'?callback=?', function(json){
		var myStr = JSON.stringify(json);
		var myObj = JSON.parse(myStr);
		if(myObj.stream === null){
			return;
		};
		parseStreamContent(myObj, counter);
		console.log(myObj);
	});
}

var parseStreamContent = function(jsonObj, counter){
	var imgSrc = jsonObj.stream.channel['logo'];
	var channel = jsonObj.stream.channel['display_name'];
	var url = jsonObj.stream.channel['url'];
	var status = jsonObj.stream.channel['status'];
	var game = jsonObj.stream.channel['game'];

	displayStreamContent(imgSrc, channel, url, status, game, counter);
}


var displayStreamContent = function(imgSrc, channel, url, status, game, counter){
	var imgId = 'streamer-img-' + counter;
	var channelId = 'streamer-channel-' + counter;
	var streamerStatus = 'streamer-status-' + counter;
	$('#streams-container').append('<div class="streamer-box"><span class="streamer-img" id="' + imgId + '"></span><span class="streamer-channel" id="' + channelId + '"></span><span class="streamer-status" id="' + streamerStatus + '"></span></div>');

	$('#' + imgId).html('<img class="streamer-img img-responsive" src="' + imgSrc + '">')
	$('#' + channelId).html(channel);
	$('#' + streamerStatus).html(status);
}