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
    queries.addPlant(req.body).then(function(plantId) {
      res.status(200);
      res.json(plantId)
    })
  })
  .put(function(req, res) {
    queries.updatePlant(req.body).then(function() {
      //TODO: in the future, if a user updates a plant's image, we will want to send back the new S3 url
      //for now, let's not worry about it
      res.status(200)
      res.end();
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
    
    //check password and username against database
    let user = await queries.getUserByUsername(req.body.username);

    //if user is undefined, it doesn't exist: redirect
    if (user === undefined) {
      
      return res.redirect('/login')
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

router.route("/logout")
  .get(function(req, res) {
    req.session.destroy((err) => {
      if (!err) {
        res.redirect("/login")
      }
    })
  })

//the home route. If the user is logged in, send them to the user's home page: /home/userId
router.route('/home')
  .get(function(req, res) {
    res.status(200);
    res.redirect('/home/' + req.session.user.id)
  })

//the user's home page. If the user is logged in, 
router.route('/home/:username')
  .get(function(req, res) {
    //check if url matches user
    if (req.url !== "/home/" + req.session.user.id) {
      //if it doesn't, send them to the home url that does match the user
      res.redirect("/home/" + req.session.user.id)
    } else {
      //if it does, serve up index.html
      res.sendFile(path.join(__dirname, '../client/index.html'));
    }    
  })

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