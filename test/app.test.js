import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import App from '../client/app/components/App.jsx'

describe('App', function() {
  

  it('should render correctly', function() {
    const wrapper = shallow(<App />)

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render 1 Menu element
  it('should render 1 Menu component', function() {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Menu)).to.have.length(1);
  })
})