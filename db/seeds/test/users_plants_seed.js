//this article was a huge help in figuring out how to seed tables that contain foreign keys:
// https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc

var dummyData = require('../../../dummyData.js')

exports.seed = function(knex, Promise) {
  //we have to first seed the user THEN the plants becuase the plants reference user Ids
  // Deletes ALL existing entries in users and plants
  return knex('plants').del() 
    .then(function() {
      knex('users').del()
    }) //then we insert the users
    .then(function() {
      return knex('users').insert({
        name: dummyData.users[0]["name"],
        password: dummyData.users[0]["password"]
      });
    })
    .then(function() {
      return knex('users').insert({
        name: dummyData.users[1]["name"],
        password: dummyData.users[1]["password"]
      })
    }) //now we add in the plants
    .then(function() {
      let plantPromises = [];
      dummyData.existingPlants.forEach(function(plant) {
        let user = plant.user;
        plantPromises.push(createPlant(knex, plant, user))
      });

      return Promise.all(plantPromises)
    })
};

//helper function to insert new record in plants table
const createPlant = function(knex, plant, user) {
  return knex('users').where('name', user).first()
    .then((userRecord) => {
      return knex('plants').insert({
        name: plant.name,
        image: plant.img,
        dateAdded: plant.dateAdded,
        lastWatered: plant.lastWatered,
        user_id: userRecord.id
      });
    });
}