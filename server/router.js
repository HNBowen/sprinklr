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

router.route('/users/:id')
  .get(function(req, res) {
    queries.getUserById(req.params.id).then(function(user) {
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