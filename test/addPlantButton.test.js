import React from 'react';
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import AddPlantButton from '../client/app/components/AddPlantButton.jsx'

describe('AddPlantButton', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<AddPlantButton />)
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should call displayModal when clicked', function() {
    const mockDisplayModal = jest.fn()
    const wrapper = shallow(<AddPlantButton displayModal={mockDisplayModal}/>);

    wrapper.find("button").simulate("click")

    expect(mockDisplayModal.mock.calls.length).to.equal(1);

  })
})