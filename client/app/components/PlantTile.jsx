import React from 'react'
import PropTypes from 'prop-types'

const PlantTile = (props) => {
  return (
      <div onClick={function() { props.handleClick(props.plant.id) }}>
        <img src={props.plant.image}/>
        <span>{props.plant.name}</span>
      </div>
    )
}

PlantTile.propTypes = {
  plant: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default PlantTile