var fb = new Firebase("https://teeny-chat.firebaseio.com/");

$(document).ready(function() {

  $("#loginWithFacebook").click(function() {
    fb.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          // fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page
          ref.authWithOAuthRedirect("facebook", function(error) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              // We'll never get here, as the page will redirect on success.
            }
          });
        } else {
          console.log("Login Failed!", error);
        }
      } else if (authData) {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });

  $("#logout").click(function() {
    fb.unauth();
  });

  $("#getName").click(function() {
    if(fb.getAuth()) {
      $(".login").prepend("uid: " + fb.getAuth().uid
        + " name: " + fb.getAuth().facebook.displayName+"\n");
    };
  });

  fb.onAuth(function(authData) {
    if (authData) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      fb.child("users").child(authData.uid).set({
        name: authData.facebook.displayName,
        image: authData.facebook.profileImageURL
      });
    }
  });

});
