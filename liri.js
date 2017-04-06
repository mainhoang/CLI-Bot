var keys = require("./keys.js");
var command = process.argv[2];

var twitterConsumerKey = keys.twitterKeys.consumer_key;
var twitterConsumerSecret = keys.twitterKeys.consumer_secret;
var twitterTokenKey = keys.twitterKeys.access_token_key;
var twitterTokenSecret = keys.twitterKeys.access_token_secret;

console.log("TWITTER CONSUMER KEY: ", twitterConsumerKey);
console.log("TWITTER CONSUMER SECRET: ", twitterConsumerSecret);
console.log("TWITTER ACCESS TOKEN KEY: ", twitterTokenKey);
console.log("TWITTER ACCESS TOKEN SECRET: ", twitterTokenSecret);
console.log("===========================");

if(command === "my-tweets"){

}

if(command === "spotify-this-song"){

}

if(command === "movie-this"){

}

if(command === "do-what-it-says"){

}


