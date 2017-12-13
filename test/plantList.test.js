import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantList from '../client/app/components/PlantList.jsx'
import PlantTile from '../client/app/components/PlantTile.jsx'

describe('PlantList', function() {
  //it should render correctly
  it('should render correctly', function() {
    const wrapper = shallow(<PlantList plants={[]}/>);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render PlantTiles from props
  it('should render PlantTiles from props', function() {
    const wrapper = shallow(<PlantList plants={[{name: 'plant1', img: 'image'},{name: 'plant2', img: 'image'}]}/>)
    expect(wrapper.find(PlantTile)).to.have.length(2);
  })
})