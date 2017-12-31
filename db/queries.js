const knex = require('./knex')
const bcrypt = require('bcrypt');

function Users() {
  return knex('users')
}

function Plants() {
  return knex('plants')
}

function getAllUsers() {
  return Users().select()
}

function getUserById(id) {
  return Users().where('id', parseInt(id)).first();
}

function getUserByUsername(username) {
  return Users().where('name', username).first();
}

function getAllPlants() {
  return Plants().select()
}

function getPlantsById(id) {
  return Plants().where('user_id', id)
}

async function addUser(newUser) {
  try {
    let hash = await bcrypt.hash(newUser.password, 10);
    return Users().insert({
      name: newUser.username,
      password: hash
    }).then(function() {
      return getUserByUsername(newUser.username)
    })
  } catch(err) {
    throw new Error(err)
  }
}

function addPlant(plant) {
  return Plants().insert({
    name: plant.name,
    image: plant.img,
    dateAdded: new Date(),
    lastWatered: plant.lastWatered,
    user_id: plant.user_id
  }).returning('id').then(function(id) {
    //TODO: I should probably return the image url too, since this will ultimately be created in the server
    return id[0]
  })
}

module.exports = {
  getAllUsers: getAllUsers,
  getAllPlants: getAllPlants,
  getUserByUsername: getUserByUsername,
  getPlantsById: getPlantsById,
  addUser: addUser,
  addPlant: addPlant
}