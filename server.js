console.log("Starting up the server...");
var express = require('express');
var app = express();

var server = require('http').createServer(app);;

app.use('/snake', express.static('static'));

server.listen(3000, function() {
	console.log('Server listening on port 3000!');
});
