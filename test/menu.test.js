import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

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
})