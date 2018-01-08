import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Register = (props) => {
  return (
      <div className="login-page">
        <span className="login-title">Sprinklr</span>
        <form onSubmit={(e) => props.handleRegister(e).then((url) => {
          props.history.push(url)
        })} className="login-form">
          <input type="text" name="username" placeholder="username" className="login-form-input"></input>
          <input text="text" name="password" placeholder="password" className="login-form-input"></input>
          <button type="submit" className="login-button">Register</button>
        </form>
        <a href="/login" className="register-link">Already have an account? Click here to login.</a>
      </div>
    )
}

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired
}

export default withRouter(Register)