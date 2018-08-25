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

    var scoreDifference = 100;

    for (var i = 0; i < friendsData.length; i++) {

      var eachDifference = 0;

      for (var j = 0; j < newPersonScore.length; j++) {
          eachDifference += Math.abs(friendsData[i].scores[j] - newPersonScore[j])
      }

      if (eachDifference < scoreDifference){
          bestMatch.name = friendsData[i].name;
          bestMatch.photo = friendsData[i].photo
          scoreDifference = eachDifference;
      }

    }
    console.log(friendsData);
    
    console.log(newPerson);
    console.log(bestMatch);


    res.json(bestMatch);

    friendsData.push(newPerson);

  });

};
