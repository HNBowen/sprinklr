import React from 'react'

const AddPlantModal = (props) => {
  return (
    <div>
      <form>
        Name: <input type="text" name="name" data-test-id="plantName"/>
        Image: <input type="fileInput" name="image" data-test-id="plantImage"/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddPlantModal