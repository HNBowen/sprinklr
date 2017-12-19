import React from 'react';

import Menu from './Menu.jsx'
import PlantList from './PlantList.jsx'

//dummy data for development, remove later
import { existingPlants, plantsToAdd } from '../../../dummyData.js'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      "addPlantModalVisible": false,
      "sort": false,
      "plants": []
    }
  }

  handleOrderButtonClick() {
    this.setState({
      "sort": !this.state.sort
    })
  }

  handleAddPlantButtonClick(newPlant) {
    //TODO: send plant to database
    this.state.plants.push(newPlant)
  }

  handlePlantTileClick(plantId) {
    //TODO: send updated plant to database
    var plant;
    for (var i = 0; i < this.state.plants.length; i++) {
      if (this.state.plants[i].id === plantId) {
        var date = new Date();
        this.state.plants[i]["lastWatered"] = date;
        break
      }
    }
  }

  render() {
    return (
        <div>
          <h1>Sprinklr</h1>
          <Menu handleOrderButtonClick={this.handleOrderButtonClick.bind(this)}
                handleAddPlantButtonClick={this.handleAddPlantButtonClick.bind(this)}
          />
          <PlantList plants={this.state.plants}
            handlePlantTileClick={this.handlePlantTileClick.bind(this)}
            sort={this.state.sort}
          />
        </div>
      );
  }
}

export default App;