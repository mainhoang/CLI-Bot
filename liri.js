var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs")

var command = process.argv[2];
var input = process.argv.splice(3).join(" ");


function getTweets() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    var parameters = { screen_name: 'mainhoang', count: 20 };

    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (!error) {
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
}

function getSong(input) {

    spotify.search({ type: 'track', query: input }, function(err, data) {
        console.log("===========================");
        // console.log(JSON.stringify(data, null, 2));
        // console.log(err);
        if (err) {
            console.log('Error occurred: ' + err);
        } else if (data.tracks.items.length === 0) {
            console.log("!!! BAD SONG for BAD INPUT");
            getSong("The Sign Ace Of Base");
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

}

function getMovie(input) {
    request("http://www.omdbapi.com/?t=" + input + "&plot=full&tomatoes=true", function(error, response, body) {
        console.log("===========================");
        // console.log(JSON.parse(body));
        var movieObj = JSON.parse(body);

        if (error) {
            console.log("ERROR: ", error);
        } else if (movieObj.Response === "False") {
            console.log("!!! Movie not found !!!");
            getMovie("Mr. Nobody");
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
}

function getCommand() {
    fs.readFile('random.txt', "utf8", function(error, data) {
        if (error) throw error;
        // console.log(data.split(","));
        var dataArr = data.split(",");
        
        if (dataArr[0] === "my-tweets") {
            getTweets();
        }
        if (dataArr[0] === "spotify-this-song") {
            getSong(dataArr[1]);
        }
        if (dataArr[0] === "movie-this") {
            getMovie(dataArr[1]);
        }
        if (dataArr[0] === "do-what-it-says") {
            getCommand();
        }
    });
}


if (command === "my-tweets") {
    getTweets();
}
if (command === "spotify-this-song") {
    getSong(input);
}
if (command === "movie-this") {
    getMovie(input);
}
if (command === "do-what-it-says") {
    getCommand();
}
