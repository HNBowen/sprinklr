import {handleLogin, handleRegister, fetchPlants, postPlant, waterPlant} from '../../client/utils.js'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'

describe('handleLogin', function() {
  
  //mock fetch posts to the login route
  beforeEach(function() {
    fetchMock.post('/login', 301);
  })

  //reset fetchMock's call history
  afterEach(function() {
    fetchMock.reset()
  })

  //retore fetch to unmocked version
  afterAll(function() {
    fetchMock.restore();
  })

  it('should make a POST request to login', function() {
    let mockEvent = {
      target: {
        username: {
          value: "test"
        },
        password: {
          value: "test"
        }
      },
      preventDefault: jest.fn()
    }

    handleLogin(mockEvent).then(function() {
      let call = fetchMock.lastCall()
      //the endpoint should have been '/login'
      expect(call[0]).to.equal('/login')
      //method should be POST
      expect(call[1].method).to.equal('POST');
      //body should contain username and password
      expect(call[1].body).to.deep.equal(JSON.stringify({username: 'test', password: 'test'}))
    })
    .catch(function(err) {
      console.error(err)
    })
  })

  it('should alert if called without username or password values', function() {
    window.alert = sinon.spy();

    let badUsernameEvent = {
      target: {
        username: {
          value: ""
        },
        password: {
          value: "test"
        }
      },
      preventDefault: jest.fn()
    }

    handleLogin(badUsernameEvent);
    expect(window.alert.calledOnce).to.be.true;

    let badPasswordEvent = {
      target: {
        username: {
          value: "test"
        },
        password: {
          value: ""
        }
      },
      preventDefault: jest.fn()
    }

    handleLogin(badPasswordEvent);
    expect(window.alert.callCount).to.equal(2);
  })

  it('should prevent default browser behavior', function() {
    let mockEvent = {
      target: {
        username: {
          value: "test"
        },
        password: {
          value: "test"
        }
      },
      preventDefault: sinon.spy()
    }

    handleLogin(mockEvent);

    expect(mockEvent.preventDefault.calledOnce).to.be.true
  })


})

describe('handleRegister', function() {

  //mock fetch posts to the register route
  beforeEach(function() {
    fetchMock.post('/register', 301);
  })

  //reset fetchMock's call history
  afterEach(function() {
    fetchMock.reset()
  })

  //retore fetch to unmocked version
  afterAll(function() {
    fetchMock.restore();
  })

  it('should make a POST request to /register', function() {

    let mockEvent = {
      target: {
        username: {
          value: "test"
        },
        password: {
          value: "test"
        }
      },
      preventDefault: jest.fn()
    }

    handleRegister(mockEvent).then(function() {
      let call = fetchMock.lastCall();
      //end point should have been '/register'
      expect(call[0]).to.equal('/register')
      //method should have been POST
      expect(call[1].method).to.equal('POST')
      //request body should have contained username and pass
      expect(call[1].body).to.deep.equal(JSON.stringify({username:"test", password: "test"}))
    })
  })

  it('should alert if called with empty values for username or password', function() {
    window.alert = sinon.spy();

    let badUsernameEvent = {
      target: {
        username: {
          value: ""
        },
        password: {
          value: "test"
        }
      },
      preventDefault: jest.fn()
    }

    handleRegister(badUsernameEvent);
    expect(window.alert.calledOnce).to.be.true;

    let badPasswordEvent = {
      target: {
        username: {
          value: "test"
        },
        password: {
          value: ""
        }
      },
      preventDefault: jest.fn()
    }

    handleRegister(badPasswordEvent);
    expect(window.alert.callCount).to.equal(2);
  })

  it('should prevent default browser behavior', function() {
    let mockEvent = {
      target: {
        username: {
          value: "test"
        },
        password: {
          value: "test"
        }
      },
      preventDefault: sinon.spy()
    }

    handleRegister(mockEvent);

    expect(mockEvent.preventDefault.calledOnce).to.be.true
  })
})

describe('fetchPlants', function() {
  beforeEach(function() {
    fetchMock.get("/plants/1", [{}])
  })

  afterEach(function() {
    fetchMock.reset();
  })

  afterAll(function() {
    fetchMock.restore();
  })

  it('should make a GET request to /plants/:id', function(done) {
    fetchPlants(1).then(function(response) {

      let call = fetchMock.lastCall()

      expect(call[0]).to.equal("/plants/1")
      expect(call[1].method).to.equal("GET")
      done()
    })
  })

  it('should resolve to an array of objects', function(done) {
    fetchPlants(1).then(function(response) {
      expect(Array.isArray(response)).to.be.true;
      expect(typeof response[0]).to.equal('object')
      done();
    })
  })
})

describe('postPlant', function() {

  let plant = {
    name: "test",
    img: "test_img.jpg",
    lastWatered: new Date(),
    user_id: 1,
  }

  beforeEach(function() {
    fetchMock.post("/plants", '5')
  })

  afterEach(function() {
    fetchMock.reset()
  })

  afterAll(function() {
    fetchMock.restore()
  })

  it('should make a POST request to /plants', function(done) {
    postPlant(plant).then(function(response) {
      let call = fetchMock.lastCall();

      expect(call[0]).to.equal('/plants')
      expect(call[1].method).to.equal('POST')
      done()
    })
  })

  it('should send a plant object in the request body', function(done) {
    postPlant(plant).then(function() {
      let call = fetchMock.lastCall();

      expect(call[1].body).to.equal(JSON.stringify(plant))
      done()
    })
  })

  it('should resolve to the plant id', function(done) {
    postPlant(plant).then(function(response) {
      expect(response).to.equal(5)
      done()
    })
  })
})

describe('waterPlant', function() {

  let update = {
    id: 1,
    lastWatered: new Date()
  }

  beforeEach(function() {
    fetchMock.put("/plants", 200)
  })

  afterEach(function() {
    fetchMock.reset()
  })

  afterAll(function() {
    fetchMock.restore()
  })

  it('should make a PUT request to /plants', function(done) {
    waterPlant(update).then(function() {
      let call = fetchMock.lastCall();

      expect(call[0]).to.equal("/plants")
      expect(call[1].method).to.equal("PUT");
      done()
    })
  })

  it('should send the update as the request body', function(done) {
    waterPlant(update).then(function() {
      let call = fetchMock.lastCall();
      expect(call[1].body).to.equal(JSON.stringify(update))
      done()
    })
  })

  it('shoudl resolve to the status code', function(done) {
    waterPlant(update).then(function(response) {
      expect(response).to.equal(200)
      done()
    })
  })
})