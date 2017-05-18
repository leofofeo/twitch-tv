//JS and jQuery for RQ
$('document').ready(function(){
	callTwitchAPI();



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

var parseStreamContent = function(jsonObj){
	var imgSrc = jsonObj.stream.channel['logo'];
	var channel = jsonObj.stream.channel['display_name'];
	var url = jsonObj.stream.channel['url'];
	var status = jsonObj.stream.channel['status'];
	var game = jsonObj.stream.channel['game'];

	displayStreamContent(imgSrc, channel, url, status, game);
}

var callTwitchAPI = function(){
	$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/ign?callback=?', function(json){
		var myStr = JSON.stringify(json);
		var myObj = JSON.parse(myStr);
		parseStreamContent(myObj);
		console.log(myObj);
	});
}

var displayStreamContent = function(imgSrc, channel, url, status, game){
	$('#streams-container').html('<div class="streamer-box"><span class="streamer-img" id="streamer-img-1"></span><span class="streamer-user" id="streamer-user-1"></span><span class="streamer-status" id="streamer-status-1"></span></div>');

	$('#streamer-img-1').html('<img class="streamer-img img-responsive" src="' + imgSrc + '">')
	$('#streamer-user-1').html(channel);
	$('#streamer-status-1').html(status);
}