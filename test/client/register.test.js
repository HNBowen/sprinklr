import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import Register from '../../client/app/components/Register.jsx'



describe('Register', function() {

  let wrapper;
  beforeEach(function() {
    wrapper = shallow(<Register.WrappedComponent handleRegister={jest.fn()}/>);
  });

  it('should render correctly', function() {
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render with a form field', function() {
    expect(wrapper.find('form').length).to.equal(1)
  })

  it('should render with input fields for username and password', function() {
    expect(wrapper.find('input').length).to.equal(2)
    expect(wrapper.find('input').get(0).props.name).to.equal('username')
    expect(wrapper.find('input').get(1).props.name).to.equal('password')
  })

  it('should render with a submit button that reads "Register"', function() {
    expect(wrapper.find('button').length).to.equal(1)
    expect(wrapper.find('button').at(0).text()).to.equal('Register')
    expect(wrapper.find('button').get(0).props.type).to.equal('submit')
  })

  it('should call handleRegister when form is submitted', function() {
    let mockHandler = jest.fn();
    wrapper = shallow(<Register.WrappedComponent handleRegister={mockHandler} />)

    wrapper.find('form').simulate('submit')
    expect(mockHandler.mock.calls.length).to.equal(1);
  })

  it('should rende with an anchor tag linking to login page', function() {
    expect(wrapper.find('a[href="/login"]')).to.exist
    expect(wrapper.find('a[href="/login"]').text()).to.equal('Already have an account? Click here to login.')
  })
})