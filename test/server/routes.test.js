//set NODE_ENV to 'test' so we use the test database
process.env.NODE_ENV = "test"

const request = require('supertest');
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const bcrypt = require('bcrypt')
const router = require('../../server/router.js')
const knex = require('../../db/knex.js')

var app = express();
app.use(bodyParser())
app.use(session({
  secret: "Monstera Deliciosa",
  resave: false,
  saveUnitialized: true
}))
app.use(router);

describe('API routes', function() {
  // rollback migrations, apply migrations, and re-seed before each test
  // also, grab cookies from an authenticated request to use in future requests
  var Cookies;
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()

    //this part of the beforeEach block makes an authenticated request so we can have 
    //access to the cookies in future requests.
    //huge props to João Neto and this GitHub Gist: https://gist.github.com/joaoneto/5152248
    var newUser = {
        name: "authenticated_user",
        password: "plain_text"
      }
    //create the user
    await request(app).post("/register").send(newUser);
    //then log in
    let loginResponse = await request(app).post("/login").send(newUser);
    //then save the cookies for use in the tests
    Cookies = loginResponse.headers['set-cookie'].pop().split(';')[0];
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
////////////////////////////////////////////////////////////////////////////////

  describe('protected routes AFTER authentication', function() {

    describe('the root path', function() {
      it('should respond to a GET request', async () => {
        let response = await request(app).get("/")
        expect(response.statusCode).to.equal(200)
      })
    })

    describe('/users', function() {
      it('GET /users', (done) => {
        let response = request(app).get("/users");
        response.cookies = Cookies;
        response.end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(3);
          expect(res.body[0].id).to.exist;
          expect(res.body[0].name).to.equal('test_user_1');
          expect(res.body[0].password).to.equal('test_user_1_password')
          done();
        })
      })

      it('GET /users/:username', (done) => {
        let response = request(app).get("/users/test_user_1");
        response.cookies = Cookies;

        response.end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('test_user_1');
          done();
        })

      })
    })

    describe('/plants', function() {


      it('GET /plants', function(done) {
        let response = request(app).get("/plants");
        response.cookies = Cookies;
        response.end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(4);
          done();
        })
      })

      test('GET /plants/:userId', (done) => {
        let requestUserId = request(app).get("/users/test_user_1");
        requestUserId.cookies = Cookies;

        requestUserId.end(function(err, res) {
          let userId = res.body.id;
          let userPlants = request(app).get("/plants/" + userId);
          userPlants.cookies = Cookies;

          userPlants.end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
            done()
          })
        })

      })

      test('POST /plants', async (done) => {
        let newPlant = {
          name: "Fiddle Leaf",
          img: "https://i.pinimg.com/236x/6f/d3/2e/6fd32e64735e460852ec3c507df10354.jpg",
          lastWatered: new Date(),
          user: "test_user_2"
        };
        let response = request(app).post("/plants").send(newPlant);
        response.cookies = Cookies;

        response.end(function(err, res) {
          expect(res.statusCode).to.equal(200);

          let requestUserId = request(app).get("/users/test_user_2");
          requestUserId.cookies = Cookies;

          requestUserId.end(function(err, res) {
            let userId = res.body.id;
            let updatedPlants = request(app).get("/plants/" + userId);
            updatedPlants.cookies = Cookies

            updatedPlants.end(function(err, res) {
              expect(res.body.length).to.equal(3);
              expect(res.body[2]["name"]).to.equal("Fiddle Leaf");
              done()
            })
          })
        })

      })
    })
  })

  describe('protected routes BEFORE authentication', function() {

  })

  describe('unprotected routes', function() {


    describe('/register', function() {
      it('POST /register', async (done) => {
        var newUser = {
          name: "test_POST_user",
          password: "plain_text"
        }
        let response = await request(app).post("/register").send(newUser);

        //should respond without error
        expect(response.statusCode).to.equal(200)


        //should be able to retrieve the user
        let addedUser = request(app).get("/users/" + newUser.name);
        addedUser.cookies = Cookies;

        addedUser.end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal(newUser.name)

          //returned password should match hash of plaintext password
          bcrypt.compare(newUser.password, res.body.password, (err, isMatch) => {
            expect(isMatch).to.be.true
            done();
          })
        })
      })

      test('POST /register with duplicate username', async () => {
        var badUser = {
          name: "test_user_1",
          password: "idk"
        }

        let response = await request(app).post("/register").send(badUser);
        //duplicate usernames should be rejected
        expect(response.statusCode).to.equal(400);

      })
    })

    describe('/login', function() {

      test('successful POST /login', async () => {
        
        var user = {
          name: "test_user_login",
          password: "test_user_login_password"
        }

        //create a new user to hash the passwords. Seeded users in database are not hashed
        let createUserRequest = await request(app).post("/register").send(user);

        let response = await request(app).post("/login").send(user);

        //we should get a redirect
        expect(response.statusCode).to.equal(302)
        expect(response.headers.location).to.equal("/")
      })

      test('failed POST /login', async () => {
        
        var badUserName = {
          name: "test_bad_user",
          password: "none"
        }

        let badUserNameResponse = await request(app).post("/login").send(badUserName);

        expect(badUserNameResponse.statusCode).to.equal(302);
        expect(badUserNameResponse.headers.location).to.equal("/login")

        var badPassword = {
          name: "test_user_login",
          password: "baddy"
        }

        let badPasswordResponse = await request(app).post("/login").send(badPassword);

        expect(badPasswordResponse.statusCode).to.equal(302)
        expect(badPasswordResponse.headers.location).to.equal("/login")

      })
    })
  })

//////////////////////////////////////////////////////////////////////    
})