const request = require('supertest');
const express = require('express')
const router = require('../../server/router.js')

var app = express();
app.use(router);

describe('the root path', function() {
  it('should respond to a GET request', async () => {
    let response = await request(app).get("/")
    expect(response.statusCode).to.equal(200)
  })
})