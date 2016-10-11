var fs = require('fs');
//ggivar request = require('request');
var twitterKeys = require('./keys.js').twitterKeys;

//console.log(twitterKeys);

var Twitter = require('twitter');
 
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
    	console.log("bhagya2016: " + tweet.text+" posted on "+tweet.created_at);
    });

  }
});

// var command = process.argv[2];

// switch(command){

// 	case 'myTweets':
// 		  request('https://api.twitter.com/1.1/statuses/user_timeline.json')

// 		  break;

// 	case 'spotify-this-song':

// 		  break;

// 	case 'movie-this':

// 	 	  break;

// 	case 'do-what-it-says':

// 		  break;

// }