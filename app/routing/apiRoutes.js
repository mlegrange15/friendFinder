// connecting to the frineds data
var friendsData = require("../data/friends");

// Export API page routes
module.exports = function (app) {

  // API GET /friends route request that will show JSON of all objects in the friendsData array
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // API POST /friends route request that will take the incoming results from survey and handle logic for comparing and finding a best match
  app.post("/api/friends", function (req, res) {

    // Object to hold the new persons form info
    var newPerson = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    // Array of the new persons form scores
    var newPersonScore = [];

    // Looping through the new persons scores and pushing them into a new array converting them from string to integer
    for (var i = 0; i < req.body.scores.length; i++) {

      newPersonScore.push(parseInt(req.body.scores[i]));
    }

    // Set the objects scores property to the array of integers 
    newPerson.scores = newPersonScore;

    // Object to hold the best matched friend
    var bestMatch = {
      name: "",
      photo: "",
      scores: []
    };

    // Setting a high score difference to compare against as we loop through friends scores
    var scoreDifference = 100;

    // Looping through the saved friends
    for (var i = 0; i < friendsData.length; i++) {

      // Variable storing each iterations score comparison to the new person for best match
      var eachDifference = 0;

      // Looping through new persons scores and then comparing it against absolute value of the existing people
      for (var j = 0; j < newPersonScore.length; j++) {
          eachDifference += Math.abs(friendsData[i].scores[j] - newPersonScore[j])
      }

      // For each loop and comaprison if this difference is less than the existing one than it is the new best match
      if (eachDifference < scoreDifference){
          bestMatch.name = friendsData[i].name;
          bestMatch.photo = friendsData[i].photo
          scoreDifference = eachDifference;
      }

    }
    console.log(friendsData);
    
    console.log(newPerson);
    console.log(bestMatch);

    // Respond to the post request with the JSON object of the best match
    res.json(bestMatch);

    // Add the new person to the friends data for storage
    friendsData.push(newPerson);

  });

};
