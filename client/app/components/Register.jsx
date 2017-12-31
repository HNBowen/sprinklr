import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Register = (props) => {
  return (
      <div>
        <form onSubmit={(e) => props.handleRegister(e).then((url) => {
          props.history.push(url)
        })}>
          username: <input type="text" name="username"></input>
          password: <input text="text" name="password"></input>
          <button type="submit">Register</button>
        </form>
        <a href="/login">Already have an account? Click here to login.</a>
      </div>
    )
}

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired
}

export default withRouter(Register)