import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantTile from '../client/app/components/PlantTile.jsx'

import {existingPlants} from '../dummyData.js'

describe('PlantTile', function() {
    
  const plant = existingPlants[0]

  it('should render correctly', function() {
    const wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()}/>)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should render an image', function() {
    const wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()}/>)
    expect(wrapper.find('img')).to.have.length(1);
  })

  it('should render a title', function() {
    const wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()}/>)
    expect(wrapper.find('span')).to.have.length(1);
  })

  it('should render image source from props', function() {
    const wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()}/>)
    expect(wrapper.find('img').prop('src')).to.equal(plant.img);
  })

  it('should render name from props', function() {
    const wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()}/>)
    expect(wrapper.find('span').text()).to.equal(plant.name)
  })

  //it should call waterPlant function on click
  it('should call the waterPlant function when clicked', function() {
    const waterSpy = jest.fn();
    const wrapper = shallow(<PlantTile plant={plant} handleClick={waterSpy} />)
    wrapper.simulate("click");

    expect(waterSpy.mock.calls.length).to.equal(1);
  })

  it('should call the waterPlant function with the plantId as the only argument', function(){
    const waterSpy = jest.fn();
    const wrapper = shallow(<PlantTile plant={plant} handleClick={waterSpy} />);

    wrapper.simulate("click");

    expect(waterSpy.mock.calls[0][0]).to.equal(plant.id)
  })

  //it should change class on click
  
})