// include the modules
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var readline = require('readline');
var twitterKeys = require('./keys.js').twitterKeys;

// gets tweets from account given
function getMyTweets(){

	var screenName ='bhagya2016';
	
	// creates client object
	var client = new Twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret 
	});
	 
	// parameters needed
	var params = {screen_name:'bhagya2016', count:2};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

	  var output = '';
	  if (!error) {

	    tweets.forEach(function(tweet){
	    	output += screenName+': ' + tweet.text+" Posted on: "+tweet.created_at+'\n';
	    });
	    log(output);
	  }
	});

	
}


function getSongInfo(){

	
	var queryString = arg + '&limit=1&offset=0';

	spotify.search({ type: 'track', query: queryString }, function(err, data) {
	    var output = '';
	    if ( err ) {
	        return console.log('Error occurred: ' + err);
	     }

		output += 'Song Name: '+data.tracks.items[0].name+'\n';
		output += 'Artists: '+data.tracks.items[0].artists[0].name+'\n';
		output += 'Album: '+data.tracks.items[0].album.name+'\n';
		output += 'Preview link: '+data.tracks.items[0].preview_url+'\n';
		log(output);
 	});

	
}
 

function getMovieInfo(){

	
	request('http://www.omdbapi.com/?t='+arg+'&y=&plot=short&tomatoes=true&r=json','utf8',function(err,response,body){
		var output = '';

		if(err) {
			return console.log('Error while getting data from omdb ' +err);
		}
	    body = JSON.parse(body);

	    output += 'Title of the movie: '+body.Title+'\n';
		output += 'Release Year : '+body.Year+'\n';
		output += 'IMDB Rating : '+body.imdbRating+'\n';
		output += 'Country of production:'+body.Country+'\n';
		output += 'Language: '+body.Language+'\n';
		output += 'Plot: '+body.Plot+'\n';
		output += 'Actors: '+body.Actors+'\n';
		output += 'Rotten Tomatoes Rating: '+body.tomatoRating+'\n';
		output += 'Rotten Tomatoes URL: '+body.tomatoURL+'\n';

		log(output);
 	});

}

function randomCommand(){

  fs.readFile('./random.txt','utf8', function(err, data){
	  if (err) throw err;

	  var tempArgArray = data.split(',');
	  command = tempArgArray[0];
	  arg = tempArgArray[1];
      liri();
  });

  log('');

}


function log(output){
	console.log(output); 
	var str = '';

	str += command+' '+arg.split('+').join(' ')+'\n';
	str += output;
	str += '---------------------------------------------'+'\n';
	fs.appendFile('./log.txt',str, function(err,data){
		if(err) return console.log(err);
		})
}



var command = process.argv[2];
var arg = process.argv.slice(3,process.argv.length).join(' ');

liri();


function liri(){

	
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
}