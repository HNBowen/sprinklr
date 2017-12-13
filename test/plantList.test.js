import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantList from '../client/app/components/PlantList.jsx'

describe('PlantList', function() {
  //it should render correctly
  it('should render correctly', function() {
    const wrapper = shallow(<PlantList />);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})