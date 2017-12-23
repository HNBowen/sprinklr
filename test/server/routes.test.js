//set NODE_ENV to 'test' so we use the test database
process.env.NODE_ENV = "test"

const request = require('supertest');
const express = require('express')
const router = require('../../server/router.js')
const knex = require('../../db/knex.js')

var app = express();
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
  //After all tests are finished, we kill the connection manually
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

    it('GET /users/:id', async () => {
      let response = await request(app).get("/users/1");
      expect(response.statusCode).to.equal(200);
      expect(response.body.name).to.equal('test_user_1');
      expect(response.body.password).to.equal('test_user_1_password');
      expect(response.body.id).to.equal(1);
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