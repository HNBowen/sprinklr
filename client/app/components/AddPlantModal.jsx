import React from 'react'
import PropTypes from 'prop-types'

const AddPlantModal = (props) => 
  props.isVisible && (
    <div>
      <form onSubmit={props.handleSubmit}>
        Name: <input type="text" name="name" data-test-id="plantName"/>
        Image: <input type="fileInput" name="image" data-test-id="plantImage"/>
        <button type="submit">Add</button>
      </form>
    </div>
  )

AddPlantModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default AddPlantModal