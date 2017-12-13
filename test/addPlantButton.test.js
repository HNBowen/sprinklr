import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import AddPlantButton from '../client/app/components/AddPlantButton.jsx'

describe('AddPlantButton', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<AddPlantButton />)
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})