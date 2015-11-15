$(document).ready(function() {
  $("#sendMessage").click(function() {
    var mess = $("#message").val();
    console.log(mess);
    $.post("/sendMessage", {message: mess});
  });
});
