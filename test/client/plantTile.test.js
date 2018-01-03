import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantTile from '../../client/app/components/PlantTile.jsx'

import {existingPlants} from '../../dummyData.js'

describe('PlantTile', function() {
    
  const plant = existingPlants[0]
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()} handleDelete={jest.fn()} />)
  })

  it('should render correctly', function() {
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should render an image', function() {
    expect(wrapper.find('img')).to.have.length(1);
  })

  it('should render a span for title and last watered', function() {
    expect(wrapper.find('span')).to.have.length(2);
  })

  it('should render image source from props', function() {
    expect(wrapper.find('img').prop('src')).to.equal(plant.image);
  })

  it('should render name from props', function() {
    expect(wrapper.find('span').at(0).text()).to.equal(plant.name)
  })

  it('should render lastWatered from props', function() {
    expect(wrapper.find('span').at(1).text()).to.equal("Last watered: " + plant.lastWatered)
  })

  //it should call waterPlant function on click
  it('should call the waterPlant function when the image clicked', function() {
    const waterSpy = jest.fn();
    wrapper = shallow(<PlantTile plant={plant} handleClick={waterSpy} handleDelete={jest.fn()}/>)
    wrapper.find("img").simulate("click");

    expect(waterSpy.mock.calls.length).to.equal(1);
  })

  it('should call the waterPlant function with the plantId as the only argument', function(){
    const waterSpy = jest.fn();
    wrapper = shallow(<PlantTile plant={plant} handleClick={waterSpy} handleDelete={jest.fn()}/>);

    wrapper.find("img").simulate("click");

    expect(waterSpy.mock.calls[0][0]).to.equal(plant.id)
  })

  it('should call the handleDelete function when the x button is clicked', function() {
    const deleteSpy = jest.fn();
    wrapper = shallow(<PlantTile plant={plant} handleClick={jest.fn()} handleDelete={deleteSpy} />)

    wrapper.find("button").simulate("click")
    expect(deleteSpy.mock.calls.length).to.equal(1)
    expect(deleteSpy.mock.calls[0][0]).to.equal(plant.id)
  })

  //it should change class on click
  
})