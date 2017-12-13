import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import App from '../client/app/components/App.jsx'

describe('App', function() {
  

  it('should render correctly', function() {
    const output = shallow(<App />)

    expect(shallowToJson(output)).toMatchSnapshot();
  })
})