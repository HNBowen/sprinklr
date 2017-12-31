const express = require('express');
const queries = require('../db/queries.js')
const utils = require('./utils.js')
const bcrypt = require('bcrypt')
const path = require('path')

var router = express.Router();

//set up authentication middleware
router.use('/plants', utils.checkUser)
router.use('/users', utils.checkUser)
router.use('/home', utils.checkUser)



router.route('/users')
  .get(function(req, res) {
    queries.getAllUsers().then(function(users) {
      res.status(200)
      res.json(users);
    })
  })

router.route('/users/:username')
  .get(function(req, res) {
    queries.getUserByUsername(req.params.username).then(function(user) {
      res.status(200)
      res.json(user)
    })
  })

router.route('/plants')
  .get(function(req, res) {
    queries.getAllPlants().then(function(plants) {
      res.status(200);
      res.json(plants)
    })
  })
  .post(function(req, res) {
    queries.getUserByUsername(req.body.user).then(function(user) {
      var user_id = user.id;
      queries.addPlant(req.body, user_id).then(function() {
        res.status(200);
        res.end();
      })
    })
  })

router.route('/plants/:id')
  .get(function(req,res) {
    console.log("GET TO /plants/:id RECEIVED: ", req.params.id)
    queries.getPlantsById(req.params.id).then(function(plants) {
      console.log("FOUND PLANTS: ", plants)
      res.status(200);
      res.json(plants)
    })
  })

router.route('/login')
  .post(async function(req, res) {
    console.log("POST RECEIVED TO /login")
    //check password and username against database
    let user = await queries.getUserByUsername(req.body.username);

    //if user is undefined, it doesn't exist: redirect
    if (user === undefined) {
      console.log("USER NOT FOUND")
      return res.redirect('/login')
    } else { //otherwise, proceed to compare passwords
      let passwordsMatch = await bcrypt.compare(req.body.password, user.password);
      
      if (passwordsMatch) {
        
        var loggedInUser = {
            name: user.name,
            id: user.id
          }
        //if successful, create session
        console.log("SUCCESSFUL LOGIN")
        utils.createSession(req, res, loggedInUser);
      } else {
        console.log("PASSWORDS DO NOT MATCH")
        res.redirect('/login')
      }
    }
  })

router.route('/register')
  .post(function(req, res) {

    queries.getUserByUsername(req.body.username).then(function(found) {
      if(found) {
        res.status(400);
        res.end();
      } else {
        queries.addUser(req.body).then(function(user) {
          let newUser = {
            name: user.name,
            id: user.id
          }
          utils.createSession(req, res, newUser)
        })
      }
    })
  })

//the home route. If the user is logged in, send them to the user's home page: /home/user
router.route('/home')
  .get(function(req, res) {
    res.status(200);
    res.redirect('/home/' + req.session.user.id)
  })

//the user's home page. If the user is logged in, 
// router.route('/home/:username')
//   .get(function(req, res) {
//     console.log("GET TO /home/:username", req.url)
//     res.status(200);
//     res.end()
//     // res.sendFile(path.join(__dirname, '../client/index.html'));
//   })

// router.route('/home/static')
//   .get(function(req, res) {
//     res.send(express.static(path.join(__dirname, '../public')))
//   })

//the root route, send to home and check credentials there
router.route('/')
  .get(function(req, res) {
    res.redirect('/home')
  })

module.exports = router;