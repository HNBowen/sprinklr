import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import AddPlantModal from '../client/app/components/AddPlantModal.jsx'

describe('AddPlantModal', function() {
  it ('should render correctly if visible', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true}/>);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should not render if not visible', function() {
    const wrapper = shallow(<AddPlantModal isVisible={false} />);
    expect(shallowToJson(wrapper)).to.equal('')
  })

  //it should render with an input field for the name
  it('should render with an input field for the name', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true}/>);
    expect(wrapper.find('[data-test-id="plantName"]')).to.have.length(1);
  })
  //it should render with an image upload field
  it('should render wtih an image upload field', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true}/>);
    expect(wrapper.find('[data-test-id="plantImage"]')).to.have.length(1)
  })
  //it should render with a submit button
  it('sould render with a submit button', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true}/>);
    expect(wrapper.find('button')).to.have.length(1);
  })
  //it should call addPlant function on submit
  
})