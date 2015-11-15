var fb = new Firebase("https://teeny-chat.firebaseio.com/");

$(document).ready(function() {

  $("#loginWithFacebook").click(function() {
    console.log("PRESSES LOGIN BUTTON");
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
    console.log("LOGOUT");
    fb.unauth();
  });

  $("#getName").click(function() {
    if(fb.getAuth()) {
      $(".login").prepend("uid: " + fb.getAuth().uid
        + " name: " + fb.getAuth().facebook.displayName+"\n");
    };
  });

  var isNewUser = true;

  fb.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      fb.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData)
      });
    }
  });

  function getName(authData) {
    switch(authData.provider) {
       case 'password':
         return authData.password.email.replace(/@.*/, '');
       case 'twitter':
         return authData.twitter.displayName;
       case 'facebook':
         return authData.facebook.displayName;
    }
  }

});