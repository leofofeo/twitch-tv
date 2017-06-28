//JS and jQuery for RQ
$('document').ready(function(){
	
	for(var i = 0; i < channels.length; i++){
		callTwitchAPI(channels[i], i);	
	}
});

var channels = ["ESL_SC2", 
"OgamingSC2", 
"cretetion", 
"RobotCaleb",
"KindaFunnyGames",
"ign",
"StreamerHouse",
"Bacon_Donut"
];

var suggestedChannels = ["Syndicate", 
	"riotgames",
	"imaqtpie",
	"sodappin",
	"insomniaPC",
	"lirik",
	"AmazHS",
	"Monstercat",
	"AnomalyXd"
];


var callTwitchAPI = function(channel, counter){
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+ channel+'?callback=?', function(json){
			var myStr = JSON.stringify(json);
			var myObj = JSON.parse(myStr);
		

			parseStreamContent(channel, myObj, counter);
		});	
}

var callTwitchAPIAddition = function(channel, counter){
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+ channel +'?callback=?', function(json){
			var myStr = JSON.stringify(json);
			var myObj = JSON.parse(myStr);
			// if(myObj.stream === null){
			// 	return;
			// };
			var displayName;

			if(myObj.stream === null){
				displayName = channel;
			}
			
			if($.inArray(displayName, channels) === -1){
				parseStreamContent(channel, myObj, counter);
			} else {
				alert("You've already added that channel.");
				return;
			}				
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

	channels.push(channel);

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

	displayChannelSideContent(channel, counter);
	
}

var displayChannelSideContent = function(channelName, id){
	var sideChannelId = 'side-channel-' + id;
	$('#current-channels').append('<div class="side-channel" id="' + sideChannelId + '">' + channelName +'</div>');
}

// var applyRoundRowStyling = function(tabId){
// 	if(tabId === 'offline-streams'){
// 		console.log('offline');
// 		$('.offline:first').addClass('top-reload-div');
// 		$('.offline:last').addClass('bottom-reload-div');
// 		$('.live:first').removeClass('top-reload-div');
// 		$('.live:last').removeClass('bottom-reload-div');
// 	} else if (tabId === 'live-streams') {
// 		$('.offline:first').removeClass('top-reload-div');
// 		$('.offline:last').removeClass('bottom-reload-div');
// 		$('.live:first').addClass('top-reload-div');
// 		$('.live:last').addClass('bottom-reload-div');
// 	} else {
// 		$('div.streamer-row').removeClass('bottom-reload-div');
// 		$('div.streamer-row').removeClass('top-reload-div');
// 	}
// }


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
});

$('#info-icon').hover(
	function(e){
		$('#tooltip').show();
	},
	function(e){
		$('#tooltip').hide();
	});


$('#btn-streamer-search').on('click', function(){
	var searchQuery = $('#streamer-search-input').val();

	if($.inArray(searchQuery, suggestedChannels) === -1){
		alert('Due to cross-origin issues and because this is a sample project' +
			' where an API key wasn\'t used, only channels in the suggested ' +
			 'popular channels tooltip will be accepted as additional values.' +
			 ' This is because due to said issues, I am unable to use the "channels" end point '+
			 '(as opposed to the "streams" endpoint, which is available via the non-API key URL) ' +
			 'to verify that the channel you\'re trying to add actually exists. Sorry!');
		return;
	}

	callTwitchAPIAddition(searchQuery, channels.length);
	
});
