//polyfill and support for fetch
import "isomorphic-fetch"
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
  })
}

export const handleRegister = (e) => {

  e.preventDefault();

  console.log("handling register submit")
  console.log("password: ", e.target.password.value)
  console.log("username; ", e.target.username.value)

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
  })

}