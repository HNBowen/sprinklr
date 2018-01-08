import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import App from '../app/components/App.jsx';
import Login from '../app/components/Login.jsx';
import Register from '../app/components/Register.jsx';

import {handleLogin, handleRegister} from '../utils.js'

//style for the html and body
import '../../sass/body.scss'



ReactDOM.render(
    <Router>
      <div>
        <Route path="/login" render={() => <Login handleLogin={handleLogin}/>}/>
        <Route path="/register" render={() => <Register handleRegister={handleRegister} />}/>
        <Route path="/home/:id" component={App}/>
      </div>
    </Router>,
  document.getElementById('app'));

//render with router
  //Router
    //url is /login
      //render Login
    //url is /home
      //render App
    //url is /register
      //render Register