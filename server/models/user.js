const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const validateUser = function (user) {
  if (!(user.name && user.email)) return false;
  return true;
};

const validateUserId = function (user) {
  if (!user._id) return false;
  return true;
};

const userModel = new mongoose.model("user", userSchema);

module.exports.userModel = userModel;
module.exports.validateUser = validateUser;
module.exports.validateUserId = validateUserId;
