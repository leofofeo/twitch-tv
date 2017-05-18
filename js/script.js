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
		// if(myObj.stream === null){
		// 	return;
		// };
		parseStreamContent(channel, myObj, counter);
		console.log(myObj);
	});
}

var parseStreamContent = function(channel, jsonObj, counter){
	if(jsonObj.stream === null){
		var imgSrc = 'http://res.cloudinary.com/leofofeo/image/upload/v1495132889/default-twitch_p3fwgm.jpg';
		var channel = channel;
		var url = '';
		var content = "Offline";
		var game = '';
		var status = 'offline';
	} else {
		var imgSrc = jsonObj.stream.channel['logo'];
		var channel = jsonObj.stream.channel['display_name'];
		var url = jsonObj.stream.channel['url'];
		var content = jsonObj.stream.channel['status'];
		var game = jsonObj.stream.channel['game'];
		var status = "live";		
	};

	

	displayStreamContent(imgSrc, channel, url, content, game, counter, status);
}


var displayStreamContent = function(imgSrc, channel, url, content, game, counter, status){
	var imgId = 'streamer-img-' + counter;
	var channelId = 'streamer-channel-' + counter;
	var streamingContent = 'streamer-content-' + counter;
	if (status === "live"){
		$('#streams-container').append('<div class="row streamer-row streamer-box live"><div class="col-md-2"><span class="streamer-img" id="' + imgId + '"></span></div><div class="col-md-2"><span class="streamer-channel" id="' + channelId + '"></span></div><div class="col-md-8"><span class="streamer-content" id="' + streamingContent + '"></span></div></div>');	
	} else {
		$('#streams-container').append('<div class="row streamer-row streamer-box offline"><div class="col-md-2"><span class="streamer-img" id="' + imgId + '"></span></div><div class="col-md-2"><span class="streamer-channel" id="' + channelId + '"></span></div><div class="col-md-8"><span class="streamer-content" id="' + streamingContent + '"></span></div></div>');	
	}
	

	$('#' + imgId).html('<img class="streamer-img img-responsive" src="' + imgSrc + '">')
	$('#' + channelId).html(channel);
	if(content === 'Offline'){
		$('#' + streamingContent).html(content);	
	} else {
		$('#' + streamingContent).html('Streaming: <em>' + content + '</em>');
	}
	
}


$('.stream-selector-tab li').on('click', function(){
	var tabId = $(this).attr('id');
	$('.stream-selector-tab li').removeClass('active').addClass('inactive');
	$('#' + tabId).addClass('active').removeClass('inactive');

	switch(tabId){
		case 'all-streams':
			$('.live').show();
			$('.offline').show();
			break;
		case 'live-streams':
			$('.live').show();
			$('.offline').hide();
			break;
		case 'offline-streams':
			$('.live').hide();
			$('.offline').show();
			break;
		default:
			break;
	}
})