import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => {
  return (
      <div>
        <form>
          username: <input type="text" name="username"></input>
          password: <input type="text" name="password"></input>
          <button onClick={props.handleLogin}>Login</button>
        </form>
        <button onClick={props.handleRegister}>Register</button>
      </div>
    )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired
}

export default Login