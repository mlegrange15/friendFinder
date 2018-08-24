// connecting to the data
var friendsData = require("../data/friends");

// Routing to api pages
module.exports = function (app) {

  // API GET /friends route request that will show JSON of all objects in the friendsData array
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // API POST /friends route request that will take the incoming results from survey and handle logic of compatibility
  app.post("/api/friends", function (req, res) {

    var newPerson = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };

    var newPersonScore = [];

    for (var i = 0; i < req.body.scores.length; i++) {

      newPersonScore.push(parseInt(req.body.scores[i]));
    }

    newPerson.scores = newPersonScore;


    var bestMatch = {
      name: "",
      photo: "",
      scores: []
    };

    for (var i = 0; i < friendsData; i++) {

      var scoreDifference = 0;

      for (var j = 0; j < newPersonScore; j++) {
          // Calc absolute value diffrence and store in scoreDifference

      }

    }

    console.log(newPerson);

    res.json(newPerson);

  });

};
