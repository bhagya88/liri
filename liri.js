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
	 
	// parameters for twitter API
	var params = {screen_name:'bhagya2016', count:20};

	//API call
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

	  var output = '';
	  if (error) return console.log(error);
	
	    tweets.forEach(function(tweet){
	    	output += screenName+': ' + tweet.text+" Posted on: "+tweet.created_at+'\n';
	    });

	    log('myTweets',null,output);
	  
	});

	
}


function getSongInfo(songName){
	var song;
	// if song name not available set it to a default
	(songName) ? song = songName : song = 'The Sign by Ace of Base';
	var queryString = song + '&limit=1&offset=0';

	//API call
	spotify.search({ type: 'track', query: queryString }, function(err, data) {
	    var output = '';
	    if ( err ) {
	        return console.log('Error occurred: ' + err);
	     }

		output += 'Song Name: '+data.tracks.items[0].name+'\n';
		output += 'Artists: '+data.tracks.items[0].artists[0].name+'\n';
		output += 'Album: '+data.tracks.items[0].album.name+'\n';
		output += 'Preview link: '+data.tracks.items[0].preview_url+'\n';
		
		// call logging function
		log('spotify-this-song',songName,output);
	});
}
 

function getMovieInfo(movieName){

	var movie;
	//if movie name not avaiable set it to a default
	(movieName)? movie = movieName : movie= 'Mr. Nobody.';

	//API call
	request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json','utf8',function(err,response,body){
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

		log('movie-this',movieName,output);
 	});

}


// takes the command given in random.txt and executes it
function randomCommand(){

  fs.readFile('./random.txt','utf8', function(err, data){
	  if (err) throw err;

	  var tempArgArray = data.split(',');
	  var command = tempArgArray[0];
	  var arg = tempArgArray[1];
      liri(command, arg);
  });

  log('do-what-it-says',null,'');

}

// prints output to console and also log input and output
function log(command,argument,output){
	var str = '';
	var arg;

	(argument) ? arg = argument: arg ='';
	
	console.log(output);
	// str  has command, argument,also output
	str += command+' '+arg+'\n';
	str += output;
	str += '---------------------------------------------'+'\n';
	fs.appendFile('./log.txt',str, function(err,data){
		if(err) return console.log(err);
		});
}





// calling the main function
liri();

// main function which reads command and delegates to other functions
function liri(cmd,argument){

	var command,arg;

	(cmd) ? command = cmd : command = process.argv[2];
	(argument) ? arg = argument:  arg= process.argv.slice(3,process.argv.length).join(' ');
	
	switch(command){

		case 'myTweets':
			  getMyTweets();
			  break;

		case 'spotify-this-song':
			  getSongInfo(arg);	
			  break;

		case 'movie-this':
			  getMovieInfo(arg);
		 	  break;

		case 'do-what-it-says':
			  randomCommand();
			  break;
		default:
			 var output = 'Error: No such command. Try movie-this, myTweets or spotify-this-song'+'\n';
			 log(command,arg,output);
			 break;
	}
}