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
          <form onSubmit={(e) => this.props.handleLogin(e).then((url) => {
            this.props.history.push(url)
          })}>
            username: <input type="text" name="username"></input>
            password: <input type="text" name="password"></input>
            <button type="submit">Login</button>
          </form>
          <a href="/register">New here? Click here to register.</a>
        </div>
      )
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default withRouter(Login)