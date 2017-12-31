import React from 'react';

import Menu from './Menu.jsx'
import PlantList from './PlantList.jsx'
import AddPlantModal from './AddPlantModal.jsx'

import {fetchPlants, postPlant, waterPlant} from '../../utils.js'

//dummy data for development, remove later
import { existingPlants, plantsToAdd } from '../../../dummyData.js'

const CLOUDINARY_UPLOAD_PRESET = 'sxz0djx3';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sprinklr/upload'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      "addPlantModalVisible": false,
      "sort": false,
      "plants": [],
      "user": null
    }

    this.handleAddPlantButtonClick = this.handleAddPlantButtonClick.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  //test rendering with dummyData
  componentDidMount() {
    
    //retrieve user id from router location
    let id = this.props.match.params.id;
    
    this.setState({
      "user": id
    }, () => {
      //retrieve user's plants from the database
      fetchPlants(this.state.user).then((plants) => {
        
        this.setState({
          plants: plants
        })
      })
    })

  }


  handleOrderButtonClick() {
    this.setState({
      "sort": !this.state.sort
    })
  }

  uploadImage(file) {
    //send the uploaded image to Cloudinary with a fetch request
    //return a promise that resolves to the Cloudinary url for the image
    let formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    return fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData
    }).then(function(response) {
      return response.json()
    }).then(function(response) {
      return response.secure_url
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
      lastWatered: new Date(),
      user_id: this.state.user
    }
    
    //upload image to hosting, get url
    //then, post it (with the url) to the database
    this.uploadImage(document.getElementById('image_upload').files[0])
    .then(function(url) {
      //TODO: send plant to database to get an ID
      //then:
      newPlant.img = url;

      postPlant(newPlant).then(function(plantId) {
        newPlant.id = plantId;
        //add the new plant to the state
        this.state.plants.push(newPlant)
        //close the modal
        this.displayModal();
      }.bind(this))
    }.bind(this))
    

  }

  handlePlantTileClick(plantId) {
    //TODO: send updated plant to database

    let updatedDate = new Date();

    waterPlant({
      id: plantId,
      lastWatered: updatedDate
    })

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
      lastWatered: updatedDate
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