const express = require('express');
const http = require('http');
const path = require('path');
const router = require('./router.js')
const bodyParser = require('body-parser')

const app = express();

const server = http.Server(app);

//body parser
app.use(bodyParser())

//error handling
//if in development mode, print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    })
  })
}
//if in production environment, do not print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  })
})


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

