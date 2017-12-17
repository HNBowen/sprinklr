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
      "sort": "none",
      "plants": []
    }
  }

  handleOrderButtonClick() {
    
  }

  render() {
    return (
        <div>
          <h1>Sprinklr</h1>
          <Menu />
          <PlantList plants={this.state.plants}/>
        </div>
      );
  }
}

export default App;