var fb = new Firebase("https://teeny-chat.firebaseio.com/");

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
      }
    }
  });

  $("#spitGameButton").click(function() {
    $.get("/spitGame");
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
    $("#chatBox").prepend("<p>"+snapshot.val().message+"</p>");
  });
}
