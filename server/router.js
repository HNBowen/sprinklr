const express = require('express');
const queries = require('../db/queries.js')

var router = express.Router();


router.route('/users')
  .get(function(req, res) {
    queries.getAllUsers().then(function(users) {
      res.status(200)
      res.json(users);
    })
  })
  .post(function(req, res) {
    queries.addUser(req.body).then(function() {
      res.status(200)
      res.end()
    })
  })

router.route('/users/:username')
  .get(function(req, res) {
    console.log("************************", req.params.username)
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


router.route('/')
  .get(function(req, res) {
    res.status(200);
    res.send('response')
  })

module.exports = router;