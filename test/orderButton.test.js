import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import OrderButton from '../client/app/components/OrderButton.jsx'

describe('OrderButton', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<OrderButton />)
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})