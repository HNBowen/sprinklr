const express = require('express');
const queries = require('../db/queries.js')
const utils = require('./utils.js')
const bcrypt = require('bcrypt')

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
    queries.getPlantsById(req.params.id).then(function(plants) {
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


router.route('/home/:username')
  .get(function(req, res) {
    console.log("GET TO /home/:username")
    res.status(200);
    res.send('response')
  })

router.route('/')
  .get(function(req, res) {
    res.redirect('/home')
  })

module.exports = router;