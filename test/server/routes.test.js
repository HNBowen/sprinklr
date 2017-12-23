//set NODE_ENV to 'test' so we use the test database
process.env.NODE_ENV = "test"

const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser')
const router = require('../../server/router.js')
const knex = require('../../db/knex.js')

var app = express();
app.use(bodyParser())
app.use(router);

describe('API routes', function() {
  // rollback migrations, apply migrations, and re-seed before each test
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })
  // // rollback migrations after each test
  afterEach(async () => {
    await knex.migrate.rollback()
  })

  //node processes won't exit while sockets are still connected
  //when we require knex, it opens up a connection to the database,
  //which while still active will keep jest from exiting the test suite.
  //After all tests are finished, we kill the connection manually.
  //This github issue helped me solve this: https://github.com/facebook/jest/issues/3686
  afterAll(async () => {
    await knex.destroy()
  })

  describe('the root path', function() {
    it('should respond to a GET request', async () => {
      let response = await request(app).get("/")
      expect(response.statusCode).to.equal(200)
    })
  })

  describe('/users', function() {
    it('GET /users', async () => {
      let response = await request(app).get("/users");
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.equal(2);
      expect(response.body[0].id).to.exist;
      expect(response.body[0].name).to.equal('test_user_1');
      expect(response.body[0].password).to.equal('test_user_1_password')
    })

    it('GET /users/:username', async () => {
      let response = await request(app).get("/users/test_user_1");
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal('test_user_1');

    })

    it('POST /users', async () => {
      var newUser = {
        name: "test_POST_user",
        password: "plain_text"
      }
      let response = await request(app).post("/users").send(newUser);

      expect(response.statusCode).to.equal(200)

    })
  })

  describe('/plants', function() {
    it('GET /plants', async () => {
      let response = await request(app).get("/plants");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.equal(4);
    })
  })

  
})