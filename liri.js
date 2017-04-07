var keys = require("./keys.js");
var Twitter = require('twitter');

var command = process.argv[2];

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});
var parameters = { screen_name: 'mainhoang', count: 20 };

function getTweets() {
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

if (command === "my-tweets") {
    getTweets();
}

if (command === "spotify-this-song") {

}

if (command === "movie-this") {

}

if (command === "do-what-it-says") {

}
