const express = require('express');
const http = require('http');
const path = require('path');
const router = require('./router.js')

const app = express();

const server = http.Server(app);

//use the router
app.use('/', router);

//server static assets transpiled by webpack
app.use('/static', express.static(path.join(__dirname, '../public')))

//wildcard route, serve index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(8080, function() {
  console.log('listening on port 8080')
})

