const knex = require('./knex')

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

function getAllPlants() {
  return Plants().select()
}

module.exports = {
  getAllUsers: getAllUsers,
  getAllPlants: getAllPlants,
  getUserById: getUserById
}