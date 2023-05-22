const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// /^find/
userSchema.pre("find", function () {
  const query = this.getQuery();
  console.log("run before find...");
});

userSchema.pre("findOneAndUpdate", function () {
  console.log("run before findOneAndUpdate...");
  const query = this.getQuery();

  if (!query._id) throw new Error("query must contains id");
});

const validateUser = function (user) {
  if (!(user.name && user.email)) throw new Error("user validation failed");
};

const userModel = new mongoose.model("user", userSchema);

module.exports.userModel = userModel;
module.exports.validateUser = validateUser;
