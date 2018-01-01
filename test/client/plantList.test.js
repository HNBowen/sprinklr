import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantList from '../../client/app/components/PlantList.jsx'
import PlantTile from '../../client/app/components/PlantTile.jsx'

import {existingPlants} from '../../dummyData.js'

describe('PlantList', function() {
  //it should render correctly
  it('should render correctly', function() {
    const wrapper = shallow(<PlantList plants={[]} handlePlantTileClick={jest.fn()}/>);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render PlantTiles from props
  it('should render PlantTiles from props', function() {
    const wrapper = shallow(<PlantList plants={existingPlants} handlePlantTileClick={jest.fn()}/>)
    expect(wrapper.find(PlantTile)).to.have.length(4);
  })

  //it should pass prop Plant down to PlantTiles
  it('should pass plant prop down to PlantTiles', function() {
    const wrapper = shallow(<PlantList plants={[existingPlants[0]]} handlePlantTileClick={jest.fn()}/>)
    const plantTileWrapper = wrapper.find(PlantTile);
    const plantTileProps = plantTileWrapper.props()["plant"];
    expect(JSON.stringify(plantTileProps)).to.equal(JSON.stringify(existingPlants[0]))
  })

  it('should pass click handler down to PlantTiles', function() {
    const clickHandlerMock = () => "hi";
    const wrapper = shallow(<PlantList plants={existingPlants} handlePlantTileClick={clickHandlerMock}/>)
    const plantTileWrapper = wrapper.find(PlantTile).first();
    const plantTileHandler = plantTileWrapper.props()["handleClick"];
    expect(plantTileHandler).to.exist
    expect(plantTileHandler.toString()).to.equal(clickHandlerMock.toString())
  })
})

describe('props based rendering', function() {

  it('should render by dateAdded on first render if sort is false', function() {
    const wrapper = shallow(<PlantList sort={false} plants={existingPlants} handlePlantTileClick={jest.fn()}/>)

    expect(wrapper.find(PlantTile).get(0)["props"]["plant"]["name"]).to.equal("Elephant Ear")
  })

  it('should render by lastWatered (oldest -> newest) if sort is true', function() {
    const wrapper = shallow(<PlantList sort={true} plants={existingPlants} handlePlantTileClick={jest.fn()}/>)

    expect(wrapper.find(PlantTile).get(0)["props"]["plant"]["name"]).to.equal("Elephant Ear")
  })
})