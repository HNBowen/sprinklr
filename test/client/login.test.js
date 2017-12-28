import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import Login from '../../client/app/components/Login.jsx'

describe('Login', function() {

  it('should render correctly', function() {
    let wrapper = shallow(<Login />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should render with an input field for username', function() {
    let wrapper = shallow(<Login />)

    let usernameFieldWrapper = wrapper.find('input').get(0)

    expect(usernameFieldWrapper).to.exist;
    expect(usernameFieldWrapper.props.name).to.equal('username')
  })

  it('should render with an input field for password', function() {
    let wrapper = shallow(<Login />)

    let passwordFieldWrapper = wrapper.find('input').get(1);

    expect(passwordFieldWrapper).to.exist;
    expect(passwordFieldWrapper.props.name).to.equal('password')
  })

  it('should render with Login and Register buttons', function() {

    let wrapper = shallow(<Login />)

    let loginButtonWrapper = wrapper.find('button').get(0);
    let registerButtonWrapper = wrapper.find('button').get(1);
    
    expect(loginButtonWrapper.props.children).to.equal('Login')
    expect(registerButtonWrapper.props.children).to.equal('Register')

  })

})
