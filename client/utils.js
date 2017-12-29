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
  //POST to /login
  return fetch("/login", {
    method: "POST",
    body: {
      username: username,
      password: password
    }
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
  //POST to /login
  return fetch("/register", {
    method: "POST",
    body: {
      username: username,
      password: password
    }
  })

}