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
      "plants": [],
      "user": null
    }
  }

  //test rendering with dummyData
  componentDidMount() {
    this.setState({
      "plants": existingPlants
    })
    //retrieve username from router location
  }


  handleOrderButtonClick() {
    this.setState({
      "sort": !this.state.sort
    })
  }

  handleAddPlantButtonClick(e) {

    e.preventDefault()


    //handle blank inputs
    if(e.target.name.value === "") {
      alert('invalid name')
      return
    } else if (e.target.image.value === "") {
      alert('invalid image')
      return
    }
    

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

    var oldPlant, newPlant, index;
    for (var i = 0; i < this.state.plants.length; i++) {
      if (this.state.plants[i].id === plantId) {
        index = i;
        oldPlant = this.state.plants[i];
        break
      }
    }
    newPlant = {
      name: oldPlant["name"],
      img: oldPlant["img"],
      id: oldPlant["id"],
      dateAdded: oldPlant["dateAdded"],
      lastWatered: new Date()
    }

    this.setState({
      plants: [...this.state.plants.slice(0, index), newPlant, ...this.state.plants.slice(index + 1)]
    })
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