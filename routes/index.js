var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var fb = new Firebase("https://teeny-chat.firebaseio.com/");
var request = require('superagent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
  // fb.push({lastName: "Ever", firstName: "Greatest"});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post("/sendMessage", function(req, res, next) {
  //console.log(req.body);
  fb.push(req.body);
});

router.get("/spitGame", function(req, res, next) {
  request.get("http://pebble-pickup.herokuapp.com/tweets/random")
    .end(function(err, result) {
      if (err) {
        console.log(err);
      } else {
        var line = result.body.tweet;
        res.json(result.body);
      }
    });
});

router.post("/profanity", function(req, res, next) {
  //console.log(req.body);
  request.get("http://www.wdyl.com/profanity?q=" + req.body.text)
  .end(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result.text);
      res.json(result.text);
    }
  });
});

module.exports = router;
