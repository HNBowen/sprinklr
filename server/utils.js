const request = require('request')

//utility functions for authentication


//helper to see if the user is logged in
const isLoggedIn = function(req) {
  //if session exists, check if the user has been stored on it
  // !! converts non-boolean to true, undefined/null to false
  console.log("CHECKING SESSION: ", req.session.id)
  return req.session ? !!req.session.user : false
}

//check if the user is logged in
exports.checkUser = function(req, res, next) {
  if (isLoggedIn(req)) {
    console.log("USER IS LOGGED IN")
    next()
  } else {
    console.log("USER IS NOT LOGGED IN. REDIRECTING TO /login")
    res.redirect('/login')
  }
}

//create a session for successful logins
exports.createSession = function(req, res, newUser) {
  return req.session.regenerate((err) => {
    if (!err) {
      //save the user object on the session for easy lookup in subsequent requests
      req.session.user = newUser;
      console.log("USER SAVED ON SESSION: ", req.session.id)
      let url = "/home/" + newUser.name
      //send the user to the home page
      console.log("SESSION CREATED, REDIRECTING TO:", url);
      res.redirect(url);
    }
  })
}

