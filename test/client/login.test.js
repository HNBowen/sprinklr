import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import Login from '../../client/app/components/Login.jsx'

describe('Login', function() {

  it('should render correctly', function() {
    let wrapper = shallow(<Login handleLogin={()=>{}} handleRegister={()=>{}}/>)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should render with an input field for username', function() {
    let wrapper = shallow(<Login handleLogin={()=>{}} handleRegister={()=>{}}/>)

    let usernameFieldWrapper = wrapper.find('input').get(0)

    expect(usernameFieldWrapper).to.exist;
    expect(usernameFieldWrapper.props.name).to.equal('username')
  })

  it('should render with an input field for password', function() {
    let wrapper = shallow(<Login handleLogin={()=>{}} handleRegister={()=>{}}/>)

    let passwordFieldWrapper = wrapper.find('input').get(1);

    expect(passwordFieldWrapper).to.exist;
    expect(passwordFieldWrapper.props.name).to.equal('password')
  })

  it('should render with Login and Register buttons', function() {

    let wrapper = shallow(<Login handleLogin={()=>{}} handleRegister={()=>{}}/>)

    let loginButtonWrapper = wrapper.find('button').get(0);
    let registerButtonWrapper = wrapper.find('button').get(1);
    
    expect(loginButtonWrapper.props.children).to.equal('Login')
    expect(registerButtonWrapper.props.children).to.equal('Register')

  })

  it('should call click handlers when buttons are clicked', function() {
    let loginMock = jest.fn();
    let registerMock = jest.fn();

    let wrapper = shallow(<Login handleLogin={loginMock} handleRegister={registerMock} />)

    wrapper.find('button').at(0).simulate('click')
    wrapper.find('button').at(1).simulate('click')

    expect(loginMock.mock.calls.length).to.equal(1);
    expect(registerMock.mock.calls.length).to.equal(1);
  })

})
