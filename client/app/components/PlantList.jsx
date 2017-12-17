import React from 'react'

import PlantTile from './PlantTile.jsx'

const PlantList = (props) => {
  return (
      <div>
        {props.plants.map(function(plant) {
          return <PlantTile plant={plant} handleClick={props.handlePlantTileClick} key={plant.id} />
        })}
      </div>
    )
}

export default PlantList