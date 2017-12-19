import React from 'react'
import {shallow, mount} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'
import sinon from 'sinon';


import App from '../client/app/components/App.jsx'
import Menu from '../client/app/components/Menu.jsx'
import PlantList from '../client/app/components/PlantList.jsx'
import OrderButton from '../client/app/components/OrderButton.jsx'

import {existingPlants, plantsToAdd} from '../dummyData.js'


describe('App', function() {
  

  it('should render correctly', function() {
    const wrapper = shallow(<App />)

    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render a title h1 tag
  it('should render an h1 tag with text "Sprinklr"', function() {
    const wrapper = shallow(<App />)

    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal("Sprinklr");
  })

  //it should render 1 Menu element
  it('should render 1 Menu component', function() {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Menu)).to.have.length(1);
  })

  //it should render 1 PlantList component
  it('should render 1 PlantList component', function() {
    const wrapper = shallow(<App />)
    expect(wrapper.find(PlantList)).to.have.length(1);
  })

  it('should render with state property "addPlantModalVisible" set to false', function() {
    const wrapper = shallow(<App />)
    expect(wrapper.state('addPlantModalVisible')).to.equal(false);
  })

  it('should render with state property "sort" set to false', function() {
    const wrapper = shallow(<App />)
    expect(wrapper.state('sort')).to.be.false
  })

  it('should render with state property "plants" and it should be an array', function() {
    const wrapper = shallow(<App />)
    const plants = wrapper.state("plants");
    expect(plants).to.not.equal(undefined)
    expect(Array.isArray(plants)).to.equal(true)
  })

  it('should have handleOrderButtonClick function', function() {
    const wrapper = shallow(<App />)
    const handler = wrapper.instance().handleOrderButtonClick;
    expect(typeof handler).to.equal("function");
  })

  it('should have handleAddPlantButtonClick function', function() {
    const wrapper = shallow(<App />)
    const handler = wrapper.instance().handleAddPlantButtonClick;
    expect(typeof handler).to.equal("function")
  })

  it('should have a handlePlantTileClick function', function() {
    const wrapper = shallow(<App />)
    const handler = wrapper.instance().handlePlantTileClick;
    expect(handler).to.be.a("function")
  })

  it('should pass plants array from state down to PlantList component', function() {
    const wrapper = shallow(<App />)
    wrapper.setState({"plants": existingPlants})
    const listWrapper = wrapper.find(PlantList);
    const listWrapperPlants = listWrapper.props()["plants"]
    expect(JSON.stringify(listWrapperPlants)).to.equal(JSON.stringify(existingPlants))

  })

  it('should pass sort state down to PlantList component', function() {
    const wrapper = shallow(<App />)
    const listWrapper = wrapper.find(PlantList);
    expect(listWrapper.props()["sort"]).to.be.false
  })

  it('should pass click handlers down to Menu component', function() {
    const wrapper = shallow(<App />);
    const menuWrapper = wrapper.find(Menu);
    expect(menuWrapper.props()["handleOrderButtonClick"]).to.be.a("function")
    expect(menuWrapper.props()["displayModal"]).to.be.a("function")
  })

  it('should pass handlePlantTileClick handler down to PlantList component', function() {
    const wrapper = shallow(<App />);
    const plantListWrapper = wrapper.find(PlantList);
    expect(plantListWrapper.props()["handlePlantTileClick"]).to.be.a("function")
  })

})

describe('handleOrderButtonClick', function() {

  it('should change App sort state to true on first click', function() {

    const wrapper = shallow(<App />);

    wrapper.instance().handleOrderButtonClick();

    const sort = wrapper.state()["sort"];
    expect(sort).to.be.true;
  })

  it('should change App sort state to false on second click', function() {
    const wrapper = shallow(<App />);

    wrapper.instance().handleOrderButtonClick();
    wrapper.instance().handleOrderButtonClick();

    const sort = wrapper.state()["sort"];
    expect(sort).to.be.false
  })
})

describe('handleAddPlantButtonClick', function() {

  it('should add a new plant object to the plants array', function() {

    const wrapper = shallow(<App />);

    wrapper.instance().handleAddPlantButtonClick(plantsToAdd[0]);

    expect(JSON.stringify(wrapper.state()["plants"][0])).to.equal(JSON.stringify(plantsToAdd[0]))
  })
})

describe('handlePlantTileClick', function() {

  it('should update the selected plant\'s lastWatered date', function() {

    const wrapper = shallow(<App />);
    wrapper.setState({"plants": existingPlants});
    const oldDate = existingPlants[0]["lastWatered"];
    wrapper.instance().handlePlantTileClick(1);
    const newDate = wrapper.state()["plants"][0]["lastWatered"];


    expect(oldDate < newDate).to.be.true;


  })
})