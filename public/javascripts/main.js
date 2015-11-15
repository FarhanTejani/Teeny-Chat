var fb = new Firebase("https://teeny-chat.firebaseio.com/");
var cuss;

fb.child("users").on("child_added", function(snapshot, prevChildKey) {
  var data = snapshot.val();
  if (fb.getAuth().uid != data.uid) {
    $(".left").prepend("<button class='user' value='"+data.uid+"'><img src='"+data.image+"'/>"+data.name+"</button>");
  }
});

var chatID;
var showChat = false;

$(document).ready(function() {

  if (!fb.getAuth()) {
    window.location.assign("/login");
  }

  $("#sendMessage").click(function() {
    //$.post("/sendMessage", {message: mess});
    if (chatID) {
      var mess = $("#message").val();
      if (mess) {
        $("#message").val("");
        fb.child("chats").child(chatID).push({name: fb.getAuth().facebook.displayName, message: mess});
        $.post("/profanity", {text: encodeURIComponent(mess)}, function(res) {
          //var current = fb.child("users/" + fb.getAuth().uid +"/cussCounter");
          res = JSON.parse(res);
          if (res.response == "true") {
            console.log("You cursed");
            fb.child("users").child(fb.getAuth().uid).update({cussCounter: (cuss+1)});
          }
        });
        // $.get("http://www.wdyl.com/profanity?q=" + encodeURIComponent(mess), function(res) {
        //   console.log(res);
        // });
      }
    }
  });

  $("#spitGameButton").click(function() {
    if (chatID) {
      $.get("/spitGame", function(res) {
        fb.child("chats").child(chatID).push({name: fb.getAuth().facebook.displayName, message: res.tweet});
        $.post("/profanity", {text: encodeURIComponent(res.tweet)}, function(res) {
          //var current = fb.child("users/" + fb.getAuth().uid +"/cussCounter");
          res = JSON.parse(res);
          if (res.response == "true") {
            console.log("You cursed");
            fb.child("users").child(fb.getAuth().uid).update({cussCounter: (cuss+1)});
          }
        });
      });
    }
  });

  $("#logout").click(function() {
    console.log("logout");
    fb.unauth();
    window.location.assign("/login");
  });

  $(document.body).on('click', '.user' ,function(){
    chat(this.value);
  });
});

function chat(id) {
  //console.log(parseInt(id.substring(9)));
  var uid = parseInt((fb.getAuth().uid).substring(9));
  var uid2 = parseInt(id.substring(9));
  chatID = (uid + uid2) * 7;
  // fb.child("chats").child(chatID).push({name: fb.getAuth().facebook.displayName, message: "penis"});
  populateChat();
}

function populateChat() {
  fb.child("chats").child(chatID).off();
  $("#chatBox").empty();
  fb.child("chats").child(chatID).on("child_added", function(snapshot, prevChildKey) {
    //console.log(snapshot.val());
    $("#chatBox").prepend("<p class='chatMessage'><span class='name'>"+snapshot.val().name+ "</span>: " +snapshot.val().message+"</p>");
  });
}

fb.child("users").child(fb.getAuth().uid).on("value", function(snapshot) {
  cuss = snapshot.val().cussCounter;
  $("#cussCounter").html(snapshot.val().cussCounter);
});
