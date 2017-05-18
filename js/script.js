//JS and jQuery for RQ
$('document').ready(function(){
	$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/ign?callback=?', function(json){
		var myStr = JSON.stringify(json);
		$('#streamer-box-2').html(myStr);
		var myObj = JSON.parse(myStr);
		console.log(myObj);
	});



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