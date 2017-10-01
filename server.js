console.log("Starting up the server...");
var express = require('express');
var app = express();

app.use('/snake', express.static('static'));

app.listen(3000, function() {
	console.log('Server listening on port 3000!');
});
