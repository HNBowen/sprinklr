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
    try {
      await knex.migrate.latest()
      await knex.seed.run()
    } catch(err) {
      throw new Error(err)
    }

    //this part of the beforeEach block makes an authenticated request so we can have 
    //access to the cookies in future requests.
    //huge props to João Neto and this GitHub Gist: https://gist.github.com/joaoneto/5152248
    var newUser = {
        username: "authenticated_user",
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
    
    try {
      await knex.migrate.rollback()
    } catch(err) {
      throw new Error(err)
    }
  })

  //node processes won't exit while sockets are still connected
  //when we require knex, it opens up a connection to the database,
  //which while still active will keep jest from exiting the test suite.
  //After all tests are finished, we kill the connection manually.
  //This github issue helped me solve this: https://github.com/facebook/jest/issues/3686
  afterAll(async (done) => {
    try {
      await knex.destroy()
      done()
    } catch(err) {
      throw new Error(err)
    }
  })
////////////////////////////////////////////////////////////////////////////////

  describe('protected routes AFTER authentication', function() {

    describe('/home', function() {
      it('GET /home', (done) => {
        let response = request(app).get("/home")
        response.cookies = Cookies

        response.end((err, res) => {
          expect(res.statusCode).to.equal(302)
          expect(res.headers.location).to.equal('/home/3')
          done();
        })
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

      test('POST /plants', (done) => {
        let newPlant = {
          name: "Fiddle Leaf",
          img: "https://i.pinimg.com/236x/6f/d3/2e/6fd32e64735e460852ec3c507df10354.jpg",
          lastWatered: new Date().toDateString(),
          user: "test_user_2"
        };

        //get test_user_2 id from the database
        let userIdRequest = request(app).get("/users/" + newPlant.user);
        userIdRequest.cookies = Cookies;
        userIdRequest.end(function(err, res) {
          let userId = res.body.id;
          
          //add id to newPlant object
           newPlant.user_id = userId;
           
          //post new plant to database
          let response = request(app).post("/plants").send(newPlant);
          response.cookies = Cookies;

          response.end(function(err, res) {
            //success status code
            expect(res.statusCode).to.equal(200);
            //we should also get the plant back (now that it has an id)
            expect(res.body).to.be.a('number')

            let requestUserId = request(app).get("/users/test_user_2");
            requestUserId.cookies = Cookies;

            //request plants with test_user_2's id
            let updatedPlants = request(app).get("/plants/" + userId);
            updatedPlants.cookies = Cookies

            //verify that added plant it there
            updatedPlants.end(function(err, res) {
              expect(res.body.length).to.equal(3);
              expect(res.body[2]["name"]).to.equal("Fiddle Leaf");
              done()
            })
          })  
        })
      })

      test('PUT /plants (update lastWatered)', function(done) {

        let updatedLastWater = new Date().toDateString();

        let update = {
          id: 1,
          lastWatered: updatedLastWater
        }

        //make PUT request to /plants with update as req.body
        let putRequest = request(app).put("/plants").send(update)
        //set cookies
        putRequest.cookies = Cookies;

        putRequest.end(function(err, res) {
          //verify that non-error response
          expect(res.statusCode).to.equal(200)
          //make get request to /plants
          let getPlantsRequest = request(app).get("/plants")
          //set cookies
          getPlantsRequest.cookies = Cookies;
          getPlantsRequest.end(function(err, res) {
            //verify that the plant with id 1 has lastWatered that matches updatedLastWatered
            for(var plant in res.body) {
              if (plant.id === 1) {
                expect(plant.lastWatered).to.equal(updatedLastWater)
              }
            }
            done()                
          })
          
        })
      })
    })
  })

  describe('protected routes BEFORE authentication', function() {

    describe('/home', function() {

      test('GET /home', async () => {
        let response = await request(app).get('/home');

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
      })
    })

    describe('/users', function() {

      test('GET /users', async () => {
        let response = await request(app).get('/users');

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
      })

      test('GET /users/:username', async () => {
        let response = await request(app).get('/users/test_user_1');

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
      })
    })

    describe('/plants', function() {
      test('GET /plants', async () => {
        let response = await request(app).get('/plants');

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
      })

      test('POST /plants', async () => {
        let response = await request(app).post('/plants').send({});

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
      })

      test('GET /plants/:userId', async () => {
        let response = await request(app).get('/plants/123');

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
      })

    })

  })

  describe('unprotected routes', function() {

    describe('/', function() {
      test('GET /', (done) => {
        let response = request(app).get("/");

        response.end((err, res) => {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/home')
          done();
        })
      })
    })


    describe('/register', function() {
      it('POST /register', async (done) => {
        var newUser = {
          username: "test_POST_user",
          password: "plain_text"
        }
        let response = await request(app).post("/register").send(newUser);

        //should respond with a redirect (to home/newUser.name)
        expect(response.statusCode).to.equal(302)
        expect(response.headers.location).to.equal('/home/4')


        //should be able to retrieve the user
        let addedUser = request(app).get("/users/" + newUser.username);
        addedUser.cookies = Cookies;

        addedUser.end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal(newUser.username)

          //returned password should match hash of plaintext password
          bcrypt.compare(newUser.password, res.body.password, (err, isMatch) => {
            expect(isMatch).to.be.true
            done();
          })
        })
      })

      test('POST /register with duplicate username', async () => {
        var badUser = {
          username: "test_user_1",
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
          username: "test_user_login",
          password: "test_user_login_password"
        }

        //create a new user to hash the passwords. Seeded users in database are not hashed
        
        let createUserRequest = await request(app).post("/register").send(user);
        
        let response = await request(app).post("/login").send(user);

        //we should get a redirect
        expect(response.statusCode).to.equal(302)
        expect(response.headers.location).to.equal("/home/4")
      })

      test('failed POST /login', async () => {
        
        var badUserName = {
          username: "test_bad_user",
          password: "none"
        }

        let badUserNameResponse = await request(app).post("/login").send(badUserName);

        expect(badUserNameResponse.statusCode).to.equal(302);
        expect(badUserNameResponse.headers.location).to.equal("/login")

        var badPassword = {
          username: "test_user_login",
          password: "baddy"
        }

        let badPasswordResponse = await request(app).post("/login").send(badPassword);

        expect(badPasswordResponse.statusCode).to.equal(302)
        expect(badPasswordResponse.headers.location).to.equal("/login")

      })
    })

    describe('/logout', function() {

      test('GET /logout', async () => {

        //make the request
        let logoutResponse = await request(app).get("/logout");
        //verify that we get a redirect status code (302)
        expect(logoutResponse.statusCode).to.equal(302)
        //verify that the redirect route is /login
        expect(logoutResponse.headers.location).to.equal("/login")
        //verify that the session was destroyed by expecting the cookies to no longer exist
        expect(logoutResponse.headers['set-cookie']).to.not.exist


      })
    })
  })

//////////////////////////////////////////////////////////////////////    
})