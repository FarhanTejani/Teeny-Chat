var fb = new Firebase("https://teeny-chat.firebaseio.com/");

$(document).ready(function() {

  $("#sendMessage").click(function() {
    var mess = $("#message").val();
    $.post("/sendMessage", {message: mess});
  });

  $("#spitGameButton").click(function() {
    $.get("/spitGame");
  });

  fb.on("child_added", function(snapshot, prevChildKey) {
    var data = snapshot.val();
    $(".chatBox").prepend("<h1 style='color:blue;'>"+data.message+"</h1>");
  });
});
