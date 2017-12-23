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

function addUser(newUser) {
  return Users().insert({
    name: newUser.name,
    password: newUser.password
  })

}

module.exports = {
  getAllUsers: getAllUsers,
  getAllPlants: getAllPlants,
  getUserByUsername: getUserByUsername,
  addUser: addUser
}