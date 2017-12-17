import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import PlantList from '../client/app/components/PlantList.jsx'
import PlantTile from '../client/app/components/PlantTile.jsx'

import {existingPlants} from '../dummyData.js'

describe('PlantList', function() {
  //it should render correctly
  it('should render correctly', function() {
    const wrapper = shallow(<PlantList plants={[]}/>);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render PlantTiles from props
  it('should render PlantTiles from props', function() {
    const wrapper = shallow(<PlantList plants={existingPlants}/>)
    expect(wrapper.find(PlantTile)).to.have.length(2);
  })

  //it should pass prop Plant down to PlantTiles
  it('should pass plant prop down to PlantTiles', function() {
    const wrapper = shallow(<PlantList plants={[existingPlants[0]]}/>)
    const plantTileWrapper = wrapper.find(PlantTile);
    const plantTileProps = plantTileWrapper.props()["plant"];
    expect(JSON.stringify(plantTileProps)).to.equal(JSON.stringify(existingPlants[0]))
  })

  it('should pass click handler down to PlantTiles', function() {
    const wrapper = shallow(<PlantList plants={existingPlants}/>)
    const plantTileWrapper = wrapper.find(PlantTile).first();
    const wrapperHandler = wrapper.props()["handlePlantTileClick"]
    const plantTileHandler = plantTileWrapper.props()["handleClick"]
    expect(JSON.stringify(plantTileHandler)).to.equal(JSON.stringify(wrapperHandler))
  })
})