var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var command = process.argv[2];

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

function getSong(songInput) {

    spotify.search({ type: 'track', query: songInput }, function(err, data) {
        console.log("===========================");
        
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else if (data.tracks.items.length === 0) {
            console.log("!!! BAD SONG for BAD INPUT");
            getSong("The Sign Ace Of Base");
            return;
        } else if (!err) {
            // console.log(JSON.stringify(data, null, 2));
            var songName = data.tracks.items[0].name;
            var link = data.tracks.items[0].preview_url;
            var album = data.tracks.items[0].album.name;
            var artistObj = data.tracks.items[0].artists;
            var artistsArr = [];

            for (var i = 0; i < artistObj.length; i++) {
                var artist = data.tracks.items[0].artists[i].name;
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


if (command === "my-tweets") {
    getTweets();
}

if (command === "spotify-this-song") {
    var songInput = process.argv.splice(3).join(" ");
    getSong(songInput);
}

if (command === "movie-this") {

}

if (command === "do-what-it-says") {

}
