import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import AddPlantModal from '../client/app/components/AddPlantModal.jsx'

describe('AddPlantModal', function() {
  it ('should render correctly', function() {
    const wrapper = shallow(<AddPlantModal/>);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  //it should render with an input field for the name
  it('should render with an input field for the name', function() {
    const wrapper = shallow(<AddPlantModal/>);
    expect(wrapper.find('[data-test-id="plantName"]')).to.have.length(1);
  })
  //it should render with an image upload field
  it('should render wtih an image upload field', function() {
    const wrapper = shallow(<AddPlantModal/>);
    expect(wrapper.find('[data-test-id="plantImage"]')).to.have.length(1)
  })
  //it should render with a submit button
  it('sould render with a submit button', function() {
    const wrapper = shallow(<AddPlantModal/>);
    expect(wrapper.find('button')).to.have.length(1);
  })
  //it should call addPlant function on submit
  
})