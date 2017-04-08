var keys = require("./keys.js").twitterKeys;
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

var firstArg = process.argv[2];
var secondArg = process.argv.splice(3).join(" ");

var liri = {

	log: function(){
		var command = firstArg + " " + secondArg + "\n";
		fs.appendFile("log.txt", command, function(error){
			if (error) {
                console.log("ERROR: " + error);
            }
		})
	},

    getTweets: function() {
        var client = new Twitter(keys);
        var parameters = {
            screen_name: "mainhoang",
            count: 20
        };
        client.get("statuses/user_timeline", parameters, function(error, tweets, response) {
            if (error) {
                console.log("ERROR: " + error);
            } else {
                console.log("===========================");
                for (var i = 0; i < tweets.length; i++) {
                    var name = tweets[i].user.name;
                    var text = tweets[i].text;
                    var time = tweets[i].created_at;
                    console.log(name + " tweeted, '" + text + "' on " + time + ".");
                }
                console.log("===========================");
            }
        });
        this.log();
    },

    getSong: function(input) {
    	var self = this;
        spotify.search({ type: "track", query: input }, function(error, data) {
            console.log("===========================");
            // console.log(JSON.stringify(data, null, 2));
            if (error) {
                console.log("ERROR: " + error);
            } else if (data.tracks.items.length === 0) {
                console.log("!!! BAD SONG for BAD INPUT !!!");
                self.getSong("The Sign Ace Of Base");
            } else {
                var songObj = data.tracks.items[0];
                var songName = songObj.name;
                var link = songObj.preview_url;
                var album = songObj.album.name;
                var artistObj = songObj.artists;
                var artistsArr = [];
                for (var i = 0; i < artistObj.length; i++) {
                    var artist = songObj.artists[i].name;
                    artistsArr.push(artist);
                }
                console.log("ARTIST: " + artistsArr.join(" & "));
                console.log("SONG: " + songName);
                console.log("PREVIEW: " + link);
                console.log("ALBUM: " + album);
            }
            console.log("===========================");
        });
        this.log();
    },

    getMovie: function getMovie(input) {
        var self = this;
        request("http://www.omdbapi.com/?t=" + input + "&plot=full&tomatoes=true", function(error, response, body) {
            console.log("===========================");
            // console.log(JSON.parse(body));
            var movieObj = JSON.parse(body);
            if (error) {
                console.log("ERROR: " + error);
            } else if (movieObj.Response === "False") {
                console.log("!!! Movie not found !!!");
                self.getMovie("Mr. Nobody");
            } else {
                console.log("TITLE: " + movieObj.Title);
                console.log("YEAR RELEASED: " + movieObj.Year);
                console.log("IMDB RATING: " + movieObj.imdbRating);
                console.log("PRODUCED IN: " + movieObj.Country);
                console.log("LANGUAGE: " + movieObj.Language);
                console.log("ACTORS: " + movieObj.Actors);
                console.log("ROTTEN TOMATOES RATING: " + movieObj.tomatoRating);
                console.log("ROTTEN TOMATOES URL: " + movieObj.tomatoURL);
                console.log("PLOT: " + movieObj.Plot);
            }
            console.log("===========================");
        });
        this.log();
    },

    getCommand: function() {
        var self = this;
        fs.readFile("random.txt", "utf8", function(error, data) {
            // console.log(data);
            var dataArr = data.split(",");
            if (error) {
                console.log("ERROR: " + error);
            }
            if (dataArr[0] === "my-tweets") {
                self.getTweets();
            }
            if (dataArr[0] === "spotify-this-song") {
                self.getSong(dataArr[1]);
            }
            if (dataArr[0] === "movie-this") {
                self.getMovie(dataArr[1]);
            }
            if (dataArr[0] === "do-what-it-says") {
                self.getCommand();
            }
        });
        this.log();
    }

}

if (firstArg === "my-tweets") {
    liri.getTweets();
}
if (firstArg === "spotify-this-song") {
    liri.getSong(secondArg);
}
if (firstArg === "movie-this") {
    liri.getMovie(secondArg);
}
if (firstArg === "do-what-it-says") {
    liri.getCommand();
}
