import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantTile from '../client/app/components/PlantTile.jsx'

describe('PlantTile', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<PlantTile />)
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})