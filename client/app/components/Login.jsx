import React from 'react'

const Login = () => {
  return (
      <div>
        <form>
          username: <input type="text" name="username"></input>
          password: <input type="text" name="password"></input>
          <button>Login</button>
        </form>
        <button>Register</button>
      </div>
    )
}

export default Login