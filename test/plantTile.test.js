import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantTile from '../client/app/components/PlantTile.jsx'

describe('PlantTile', function() {
    
  const plant = {
    img: "https://pbs.twimg.com/profile_images/424105209871097856/iDClKW3Z.jpeg",
    name: 'test'
  }

  it('should render correctly', function() {
    const wrapper = shallow(<PlantTile plant={plant}/>)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should render an image', function() {
    const wrapper = shallow(<PlantTile plant={plant}/>)
    expect(wrapper.find('img')).to.have.length(1);
  })

  it('should render a title', function() {
    const wrapper = shallow(<PlantTile plant={plant}/>)
    expect(wrapper.find('span')).to.have.length(1);
  })

  it('should render image source from props', function() {
    const wrapper = shallow(<PlantTile plant={plant} />)
    expect(wrapper.find('img').prop('src')).to.equal(plant.img);
  })

  it('should render name from props', function() {
    const wrapper = shallow(<PlantTile plant={plant} />)
    expect(wrapper.find('span').text()).to.equal(plant.name)
  })

  //it should call waterPlant function on click

  //it should change class on click
  
})