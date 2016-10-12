var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var twitterKeys = require('./keys.js').twitterKeys;


function getMyTweets(){
	 var client = new Twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret 
	});
	 
	var params = {screen_name: 'bhagya2016', count:2};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

	  
	  if (!error) {
	    tweets.forEach(function(tweet){
	    	console.log("bhagya2016: " + tweet.text+" Posted on: "+tweet.created_at);
	    });

	  }
	});
}
//console.log(twitterKeys);

function getSongInfo(){

	arg += '&limit=1&offset=0';

	spotify.search({ type: 'track', query: arg }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 

    console.log(JSON.stringify(data));
 });
}
 

function getMovieInfo(){

}

function randomCommand(){

}




var command = process.argv[2];
var arg = process.argv.slice(3,process.argv.length).join('+');
console.log('arg',arg);

switch(command){

	case 'myTweets':
		 
		  getMyTweets();
		  break;

	case 'spotify-this-song':
		  getSongInfo();	
		  break;

	case 'movie-this':
		  getMovieInfo();
	 	  break;

	case 'do-what-it-says':
		  randomCommand();
		  break;

}