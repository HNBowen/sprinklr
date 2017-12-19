import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import OrderButton from '../client/app/components/OrderButton.jsx'

describe('OrderButton', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<OrderButton />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should call orderPlants function on click
  it('should call the orderPlants function on click', function() {

    const mockOrder = jest.fn();

    const wrapper = shallow(<OrderButton handleClick={mockOrder}/>);

    wrapper.find('button').simulate('click');

    expect(mockOrder.mock.calls.length).to.equal(1);
  })

})