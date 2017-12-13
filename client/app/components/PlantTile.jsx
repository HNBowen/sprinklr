import React from 'react'

const PlantTile = (props) => {
  return (
      <div>
        <img src={props.plant.img}/>
        <span>{props.plant.name}</span>
      </div>
    )
}

export default PlantTile