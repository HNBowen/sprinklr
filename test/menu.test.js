import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import Menu from '../client/app/components/Menu.jsx'

describe('Menu', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<Menu />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})