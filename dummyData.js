module.exports.existingPlants = [
  {
    name: "Peace Lily",
    image: "https://cdn.nurserylive.com/images/stories/virtuemart/product/resized/nurserylive-Peace-Lily,-Spathiphyllum-Plant_128x128.jpg",
    lastWatered: new Date(2017, 11, 20).toDateString(),
    dateAdded: new Date(2017, 8, 31).toDateString(),
    id: 1,
    user: "test_user_1"
  },
  {
    name: "Monstera",
    image: "https://static.wixstatic.com/media/e7be30_b5577954ef5347409f7c4ebaeadce8ce~mv2_d_4288_2848_s_4_2.jpg/v1/fill/w_256,h_256,q_85,usm_0.66_1.00_0.01/e7be30_b5577954ef5347409f7c4ebaeadce8ce~mv2_d_4288_2848_s_4_2.jpg",
    lastWatered: new Date(2017, 11, 21).toDateString(),
    dateAdded: new Date(2017, 7, 30).toDateString(),
    id: 2,
    user: "test_user_1"
  },
  {
    name: "Elephant Ear",
    image: "https://d13z1xw8270sfc.cloudfront.net/resize/68491/colocasia_esculenta_2.jpg/128/128/0/",
    lastWatered: new Date(2017, 10, 30).toDateString(),
    dateAdded: new Date(2017, 6, 30).toDateString(),
    user: "test_user_2"
  },
  {
    name: "Rabbit's Tail Fern",
    image: "https://cdn.nurserylive.com/images/stories/virtuemart/product/resized/nurserylive-small-rabbit-foot-fern-1_128x128.png",
    lastWatered: new Date(2017, 11, 15).toDateString(),
    dateAdded: new Date(2017, 6, 30).toDateString(),
    user: "test_user_2"
  }
];

module.exports.plantsToAdd = [
  {
    name: "Pothos",
    image: "https://images-na.ssl-images-amazon.com/images/I/71C+qx6FiUL._CR412,0,1060,1060_UX128.jpg",
    lastWatered: new Date().toDateString(),
    id: 3
  },
  {
    name: "Fiddle Leaf",
    image: "https://i.pinimg.com/236x/6f/d3/2e/6fd32e64735e460852ec3c507df10354.jpg",
    lastWatered: new Date().toDateString(),
    id: 4
  }
];

module.exports.users = [
  {
    name: "test_user_1",
    password: "test_user_1_password"
  },
  {
    name: "test_user_2",
    password: "test_user_2_password"
  }
]

