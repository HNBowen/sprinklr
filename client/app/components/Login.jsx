import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => {
  return (
      <div>
        <form onSubmit={(e) => props.handleLogin(e)}>
          username: <input type="text" name="username"></input>
          password: <input type="text" name="password"></input>
          <button type="submit">Login</button>
        </form>
        <a href="/register">New here? Click here to register.</a>
      </div>
    )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default Login