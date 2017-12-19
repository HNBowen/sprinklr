import React from 'react'

import OrderButton from './OrderButton.jsx'
import AddPlantButton from './AddPlantButton.jsx'

const Menu = (props) => {
  return (
      <div>
        <OrderButton handleClick={props.handleOrderButtonClick}/>
        <AddPlantButton handleClick={props.displayModal}/>
      </div>
    )
}

export default Menu