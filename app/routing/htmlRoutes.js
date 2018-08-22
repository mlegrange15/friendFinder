// Dependencies
var path = require("path");

// Routing to html pages
module.exports = function (app) {

    //   Survey route tp survey html page
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // Default to home if nothing is found
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};
