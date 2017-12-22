const express = require('express');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.status(200);
    res.send('response')
  })

module.exports = router;