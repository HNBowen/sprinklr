import React from 'react'

import PlantTile from './PlantTile.jsx'

const PlantList = (props) => {

  if (!props.sort) {
    return (
        <div>
          {[].concat(props.plants)
             .sort((a, b) => {return a.dateAdded > b.dateAdded})
             .map((plant) => {
                return <PlantTile plant={plant} handleClick={props.handlePlantTileClick} handleDelete={props.handleDelete} key={plant.id} />
             })
          }
        </div>
      )
  } else if (props.sort) {
    return (
        <div>
          {
            [].concat(props.plants)
              .sort((a, b) => { return a.lastWatered > b.lastWatered})
              .map((plant) => {
                return <PlantTile plant={plant} handleClick={props.handlePlantTileClick} handleDelete={props.handleDelete} key={plant.id} />
              })
          }
        </div>
      )
  }
}

export default PlantList