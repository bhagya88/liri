# LIRI Bot
LIRI is like iPhone's SIRI. It is a command line node app that takes in parameters and gives back data .

### Demo

### Technologies used
* Node.js
* Request npm module
* Readline npm module

### APIs used
* Twitter API
* Spotify API
* OMDB API

### Challenges faced
* How to use the twitter, Spotify and OMDB APIs?
* How to log the commands to a file?

### Solutions found
* Reading the documentation for the APIs helped figure out how to use them.
* Creating a function which logs the command into a file and calling that function after each command is run helped solve the problem.

### How it works

liri.js can take in one of the following commands:
* my-tweets
* spotify-this-song
* movie-this
* do-what-it-says

1. `node liri.js my-tweets`	

* This will show your last 20 tweets and when they were created at in your terminal/bash window.


2. `node liri.js spotify-this-song '<song name here>'`

	* This will show the following information about the song in your terminal/bash window
		* Artist(s)
		* The song's name
		* A preview link of the song from Spotify
		* The album that the song is from

	* if no song is provided the program will default to
		* "The Sign" by Ace of Base

3. `node liri.js movie-this '<movie name here>'`

	* This will output the following information to your terminal/bash window:

		* Title of the movie.
		* Year the movie came out.
		* IMDB Rating of the movie.
		* Country where the movie was produced.
		* Language of the movie.
		* Plot of the movie.
		* Actors in the movie.
		* Rotten Tomatoes Rating.
		* Rotten Tomatoes URL.

	* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		

4. `node liri.js do-what-it-says`
LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

5. In addition to logging the data to the terminal/bash window, it also outputs the data to a .txt file called `log.txt`.

6. It also appends each command you run to the `log.txt` file. 

#### Developed by Bhagya 