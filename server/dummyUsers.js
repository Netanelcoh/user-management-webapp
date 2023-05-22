const mongoose = require("mongoose");
const User = require("./models/user");

const data = [
  {
    name: "John",
    email: "john@gmail.com",
  },
  {
    name: "Joe",
    email: "joe@gmail.com",
  },
  {
    name: "Rachel",
    email: "rachel@gmail.com",
  },
];

async function addUsers() {
  await mongoose.connect("mongodb://localhost:27017/user");

  await User.deleteMany({});
  await User.insertMany(data);

  mongoose.disconnect();
  console.log("Done!!!!");
}

addUsers();
