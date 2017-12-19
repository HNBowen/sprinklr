import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import App from '../client/app/components/App.jsx'
import Menu from '../client/app/components/Menu.jsx'
import OrderButton from '../client/app/components/OrderButton.jsx'
import AddPlantButton from '../client/app/components/AddPlantButton.jsx'

describe('Menu', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<Menu />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render the OrderButton and AddPlantButton
  it('should render 1 OrderButton and 1 AddPlantButton', function() {
    const wrapper = shallow(<Menu />)
    expect(wrapper.find(OrderButton)).to.have.length(1);
    expect(wrapper.find(AddPlantButton)).to.have.length(1);
  })

  it('should pass down handleOrderButtonClick to OrderButton', function() {
    const mockOrderButtonHandler = () => {};
    const wrapper = shallow(<Menu handleOrderButtonClick={mockOrderButtonHandler}/>);
    const childHandler = wrapper.find(OrderButton).props()["handleClick"]

    expect(childHandler).to.exist
    expect(childHandler.toString()).to.equal(mockOrderButtonHandler.toString())
  })

  it('should pass down displayModal to AddPlantButton', function() {
    const mockDisplayModal = () => {};
    const wrapper = shallow(<Menu displayModal={mockDisplayModal}/>);
    const childHandler = wrapper.find(AddPlantButton).props()["handleClick"]

    expect(childHandler).to.exist
    expect(childHandler.toString()).to.equal(mockDisplayModal.toString())
  })
})