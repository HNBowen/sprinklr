import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import Login from '../../client/app/components/Login.jsx'

describe('Login', function() {

  it('should render correctly', function() {
    let wrapper = shallow(<Login handleLogin={()=>{}} />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should render with an input field for username', function() {
    let wrapper = shallow(<Login handleLogin={()=>{}} />)

    let usernameFieldWrapper = wrapper.find('input').get(0)

    expect(usernameFieldWrapper).to.exist;
    expect(usernameFieldWrapper.props.name).to.equal('username')
  })

  it('should render with an input field for password', function() {
    let wrapper = shallow(<Login handleLogin={()=>{}} />)

    let passwordFieldWrapper = wrapper.find('input').get(1);

    expect(passwordFieldWrapper).to.exist;
    expect(passwordFieldWrapper.props.name).to.equal('password')
  })

  it('should render with a Login button', function() {

    let wrapper = shallow(<Login handleLogin={()=>{}} />)

    let loginButtonWrapper = wrapper.find('button').get(0);
    
    expect(loginButtonWrapper.props.children).to.equal('Login')

  })

  it('should render with an anchor tag for registering', function() {
    let wrapper = shallow(<Login handleLogin={jest.fn()} />)

    let anchorWrapper = wrapper.find('a')

    expect(anchorWrapper).to.exist
    expect(anchorWrapper.text()).to.equal('New here? Click here to register.')
    expect(wrapper.find('a[href="/register"]')).to.exist
  })

  it('should call click handler when the form is submitted', function() {
    let loginMock = jest.fn();

    let wrapper = shallow(<Login handleLogin={loginMock} />)

    wrapper.find('form').simulate('submit')

    expect(loginMock.mock.calls.length).to.equal(1);
  })

})
