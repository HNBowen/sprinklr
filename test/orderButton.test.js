import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import OrderButton from '../client/app/components/OrderButton.jsx'

describe('OrderButton', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<OrderButton />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should call orderPlants function on click

  //it should orderPlants by dryest - wettest on first click

  //it should orderPlants by wettest to dryest on second click
})