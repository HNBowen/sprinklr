import React from 'react'
import PropTypes from 'prop-types'

const PlantTile = (props) => {
  return (
      <div>
        <button onClick={function() { props.handleDelete(props.plant.id) }}>x</button>
        <img src={props.plant.image} onClick={function() { props.handleClick(props.plant.id) }}/>
        <span>{props.plant.name}</span>
        <span>Last watered: {props.plant.lastWatered}</span>
      </div>
    )
}

PlantTile.propTypes = {
  plant: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default PlantTile