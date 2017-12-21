import React from 'react';

import Menu from './Menu.jsx'
import PlantList from './PlantList.jsx'
import AddPlantModal from './AddPlantModal.jsx'

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

  handleAddPlantButtonClick(e) {

    //handle blank inputs
    if(e.target.name.value === "") {
      alert('invalid name')
      return
    } else if (e.target.image.value === "") {
      alert('invalid image')
      return
    }
    e.preventDefault()

    var newPlant = {
      name: e.target.name.value,
      img: e.target.image.value,
      lastWatered: new Date()
    }
    //TODO: send plant to database to get an ID
    //then:
    this.state.plants.push(newPlant)
    this.displayModal();
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

  displayModal() {
    this.setState({"addPlantModalVisible": !this.state.addPlantModalVisible})
  }

  render() {
    return (
        <div>
          <h1>Sprinklr</h1>
          <Menu handleOrderButtonClick={this.handleOrderButtonClick.bind(this)}
                displayModal={this.displayModal.bind(this)}
          />
          <AddPlantModal isVisible={this.state.addPlantModalVisible}
                         handleSubmit={this.handleAddPlantButtonClick.bind(this)}
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