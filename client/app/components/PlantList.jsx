import React from 'react'

import PlantTile from './PlantTile.jsx'

const PlantList = (props) => {
  return (
      <div>
        {props.plants.map(function(plant) {
          return <PlantTile plant={plant} />
        })}
      </div>
    )
}

export default PlantList