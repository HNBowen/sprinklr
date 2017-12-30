import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import App from '../app/components/App.jsx';
import Login from '../app/components/Login.jsx';

import {handleFormClick} from '../utils.js'



ReactDOM.render(
    <Router>
      <div>
        <Route path="/login" render={() => <Login handleClick={handleFormClick}/>}/>
        <Route path="/home/:username" component={App}/>
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