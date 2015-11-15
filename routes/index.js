var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var fb = new Firebase("https://teeny-chat.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  // fb.push({lastName: "Ever", firstName: "Greatest"});
});

router.post("/sendMessage", function(req, res, next) {
  //console.log(req.body);
  fb.push(req.body);
});

module.exports = router;
