import {handleLogin, handleRegister} from '../../client/utils.js'
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
    fetchMock.restor();
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
      console.log(fetchMock.lastCall('/login'));
      let call = fetchMock.lastCall('/login')
      //the endpoint should have been '/login'
      expect(call[0]).to.equal('/login')
      //method should be POST
      expect(call[1].method).to.equal('POST');
      //body should contain username and password
      expect(call[1].body).to.deep.equal({username: 'test', password: 'test'})
    })
    .catch(function(err) {
      console.error(err)
    })

  })
})

describe('handleRegister', function() {

})