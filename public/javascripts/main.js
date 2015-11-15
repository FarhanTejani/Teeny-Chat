var fb = new Firebase("https://teeny-chat.firebaseio.com/");
fb.child("users").on("child_added", function(snapshot, prevChildKey) {
  var data = snapshot.val();
  if (fb.getAuth().uid != data.uid) {
    $(".chatBox").prepend("<button style='display:list-item;' class='user' value='"+data.uid+"'><img src='"+data.image+"'/>"+data.name+"</button>");
  }
});

$(document).ready(function() {

  if (!fb.getAuth()) {
    window.location.assign("/login");
  }

  $("#sendMessage").click(function() {
    var mess = $("#message").val();
    $.post("/sendMessage", {message: mess});
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
  fb.child(fb.getAuth().uid + id + "").push({message: "penis"});
}
