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


function getSongInfo(){

	arg += '&limit=1&offset=0';

	spotify.search({ type: 'track', query: arg }, function(err, data) {
	    if ( err ) {
	        return console.log('Error occurred: ' + err);
	     }

		console.log('Song Name: ',data.tracks.items[0].name);
		console.log('Artists: ',data.tracks.items[0].artists[0].name);
		console.log('Album: ',data.tracks.items[0].album.name);
		console.log('Preview link: ',data.tracks.items[0].preview_url);

 	});
}
 

function getMovieInfo(){

	request('http://www.omdbapi.com/?t='+arg+'&y=&plot=short&tomatoes=true&r=json','utf8',function(err,response,body){

	if(err) {
		return console.log('Error while getting data from omdb ' +err);
	}
    body = JSON.parse(body);
    console.log("Title of the movie: ",body.Title);
	console.log("Release Year : ",body.Year);
	console.log("IMDB Rating : ",body.imdbRating);
	console.log("Country of production: ",body.Country);
	console.log("Language: ",body.Language);
	console.log("Plot: ",body.Plot);
	console.log("Actors: ",body.Actors);
	console.log("Rotten Tomatoes Rating: ",body.tomatoRating);
	console.log("Rotten Tomatoes URL: ",body.tomatoURL);

 	});

}

function randomCommand(){

}




var command = process.argv[2];
var arg = process.argv.slice(3,process.argv.length).join('+');


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