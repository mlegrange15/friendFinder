// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Set the port of app
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Create express app
var app = express();

// Handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Points server to "routing" files.
require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});