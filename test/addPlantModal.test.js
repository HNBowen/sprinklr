import React from 'react'
import {shallow} from 'enzyme'
import {shallowToJson} from 'enzyme-to-json'

import AddPlantModal from '../client/app/components/AddPlantModal.jsx'

import {plantsToAdd} from '../dummyData.js'

describe('AddPlantModal', function() {
  it ('should render correctly if visible', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true} handleSubmit={()=>{}}/>);
    jestExpect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it('should not render if not visible', function() {
    const wrapper = shallow(<AddPlantModal isVisible={false} handleSubmit={()=>{}}/>);
    expect(shallowToJson(wrapper)).to.equal('')
  })

  //it should render with an input field for the name
  it('should render with an input field for the name', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true} handleSubmit={()=>{}}/>);
    expect(wrapper.find('[data-test-id="plantName"]')).to.have.length(1);
  })
  //it should render with an image upload field
  it('should render wtih an image upload field', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true} handleSubmit={()=>{}}/>);
    expect(wrapper.find('[data-test-id="plantImage"]')).to.have.length(1)
  })
  //it should render with a submit button
  it('sould render with a submit button', function() {
    const wrapper = shallow(<AddPlantModal isVisible={true} handleSubmit={()=>{}}/>);
    expect(wrapper.find('button')).to.have.length(1);
  })
  //it should call addPlant function on submit
  it('should call the addPlant function on submit', function() {
    const mockAddPlant = jest.fn();
    const wrapper = shallow(<AddPlantModal isVisible={true} handleSubmit={mockAddPlant}/>)

    wrapper.find('form').simulate('submit');

    expect(mockAddPlant.mock.calls.length).to.equal(1);

  })

  it('should call addPlant function with args from the form', function() {
    const mockAddPlant = jest.fn();
    const wrapper = shallow(<AddPlantModal isVisible={true} handleSubmit={mockAddPlant}/>);

    //set the form data

    

    wrapper.find('form').simulate('submit');

    console.log(mockAddPlant.mock.calls[0][0])

    // expect(event.target.name.value).to.equal(plantsToAdd[0]["name"])
    // expect(event.target.image.value).to.equal(plantsToAdd[0]["img"])
  })
  
})