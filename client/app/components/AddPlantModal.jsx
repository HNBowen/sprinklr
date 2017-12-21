import React from 'react'
import PropTypes from 'prop-types'

const AddPlantModal = (props) => 
  props.isVisible && (
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        Name: <input type="text" name="name" data-test-id="plantName"/>
        Image: <input type="file" name="image" accept="image/*" data-test-id="plantImage"/>
        <button type="submit">Add</button>
      </form>
    </div>
  )

AddPlantModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddPlantModal