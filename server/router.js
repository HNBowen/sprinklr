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

router.route('/')
  .get(function(req, res) {
    res.status(200);
    res.send('response')
  })

module.exports = router;