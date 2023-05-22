const mongoose = require("mongoose");

module.exports = async function () {
  try {
    console.log("Try to connect to db");
    await mongoose.connect("mongodb://localhost:27017/user");
    console.log("Connect successfully");
  } catch (error) {
    throw new Error("Fail to connect to Mongo \n" + error);
  }
};
