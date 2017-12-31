const request = require('request')

//utility functions for authentication


//helper to see if the user is logged in
const isLoggedIn = function(req) {
  //if session exists, check if the user has been stored on it
  // !! converts non-boolean to true, undefined/null to false
  
  return req.session ? !!req.session.user : false
}

//check if the user is logged in
exports.checkUser = function(req, res, next) {
  if (isLoggedIn(req)) {
    
    next()
  } else {
    
    res.redirect('/login')
  }
}

//create a session for successful logins
exports.createSession = function(req, res, newUser) {
  return req.session.regenerate((err) => {
    if (!err) {
      //save the user object on the session for easy lookup in subsequent requests
      req.session.user = newUser;
    
      let url = "/home/" + newUser.id
      //send the user to the home page
    
      
      res.redirect(url);
    }
  })
}

