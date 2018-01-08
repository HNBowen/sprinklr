import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

//styles
import '../../../sass/Login.scss'

class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="login-page">
          <span className="login-title">Sprinklr</span>
          <form onSubmit={(e) => this.props.handleLogin(e).then((url) => {
            this.props.history.push(url)
          })} className="login-form">
            <input type="text" name="username" placeholder="username" className="login-form-input"></input>
            <input type="password" name="password" placeholder="password" className="login-form-input"></input>
            <button type="submit" className="login-button">Login</button>
          </form>
          <a href="/register" className="register-link">New here? Click here to register.</a>
        </div>
      )
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default withRouter(Login)