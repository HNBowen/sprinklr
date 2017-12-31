//polyfill and support for fetch
// import "isomorphic-fetch"
import promise from 'es6-promise'
promise.polyfill()

// export const readImage(file, cb) => {

//   //create a FileReader object
//   var reader = new FileReader();


// }

export const handleLogin = (e) => {
  //prevent default browser behavior
  e.preventDefault();

  let username = e.target.username.value;
  let password = e.target.password.value;
  //handle blank values
  if (username === "" || password === "") {
    alert("Invalid username or password")
    return;
  }

  var body = {
    username: username,
    password: password
  }
  //POST to /login
  return fetch("/login", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(body),
    credentials: 'same-origin'
  }).then((response) => {
      //return the last pieces of the URL so React Router can handle routing clien-side
      var url = '/' + response.url.split('/')[3] + '/' + response.url.split('/')[4];
      return url;
  }).catch((err) => {
    throw new Error(err)
  })
}

export const handleRegister = (e) => {

  e.preventDefault();

  let username = e.target.username.value;
  let password = e.target.password.value;
  //handle blank values
  if (username === "" || password === "") {
    alert("Invalid username or password")
    return;
  }

  var body = {
    username: username,
    password: password
  }
  //POST to /login
  return fetch("/register", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(body),
    credentials: 'same-origin'
  }).then((response) => {
      var url = '/' + response.url.split('/')[3] + '/' + response.url.split('/')[4];
      return url;
  }).catch((err) => {
    throw new Error(err)
  })

}

export const fetchPlants = (id) => {
  console.log('fetching plants for user: ', id)
  return fetch("/plants/" + id, {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    credentials: 'same-origin'
  }).then((response) => {
    return response
  })
}