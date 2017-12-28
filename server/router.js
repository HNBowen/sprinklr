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
  .post(async (req, res) => {
    //check password and username against database
    let user = await queries.getUserByUsername(req.body.name);

    //if user is undefined, it doesn't exist: redirect
    if (user === undefined) {
      res.redirect('/login')
    } else { //otherwise, proceed to compare passwords
      let passwordsMatch = await bcrypt.compare(req.body.password, user.password);
      
      if (passwordsMatch) {
        var loggedInUser = {
            name: user.name,
            id: user.id
          }
        //if successful, create session
        utils.createSession(req, res, loggedInUser);
      } else {
        res.redirect('/login')
      }
    }

  })

router.route('/register')
  .post(function(req, res) {
    queries.getUserByUsername(req.body.name).then(function(found) {
      if(found) {
        res.status(400);
        res.end();
      }
      queries.addUser(req.body).then(function() {
        res.status(200)
        res.end()
      })
    })
  })


router.route('/home')
  .get(function(req, res) {
    res.status(200);
    res.send('response')
  })

module.exports = router;