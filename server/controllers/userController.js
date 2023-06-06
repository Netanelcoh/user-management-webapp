const { default: mongoose } = require("mongoose");
const { userModel, validateUser, validateUserId } = require("../models/user");

async function findUser(req, res) {
  try {
    const query = req.query;

    if (query === undefined || Object.entries(query).length === 0) {
      const users = await userModel.find({});
      res.status(200).send(users);
      return;
    }

    const users = await userModel.find(query);
    if (users.length === 0) {
      res.status(404).send(`
        Unable to find user. it might be because the following reasons:
        1) user with ${query} is not exist in db.
        2) query structure is not proper. should looks like: {name:"" , email:""}
        `);
      return;
    }
    res.status(200).send(users);
  } catch (error) {
    let msg = createCustomeErrorMsg(error);
    console.log(error);
    res.status(400).send(msg);
  }
}

async function addUser(req, res) {
  try {
    let query = req.body;

    if (
      query === undefined ||
      Object.entries(query).length === 0 ||
      !validateUser(query)
    ) {
      res.status(400).send("query should contain {name: , email: _}");
      return;
    }

    await userModel.insertMany(query);
    console.log("new user is created " + query);
    res.status(200).send("new user is created");
  } catch (error) {
    let msg = createCustomeErrorMsg(error);
    console.log(error);
    res.status(400).send(msg);
  }
}

async function editUser(req, res) {
  try {
    const query = req.body;

    if (
      query === undefined ||
      Object.entries(query).length === 0 ||
      !validateUserId(query)
    ) {
      res.status(400).send("query should contains {id: , name: , email: _}");
      return;
    }

    const updatedUser = { name: query.name, email: query.email };
    const user = await userModel.findOneAndUpdate(
      { _id: query._id },
      {
        ...updatedUser,
      }
    );
    if (user === null) {
      res.status(404).send("User with the given id is not found");
      return;
    }
    res.status(200).send("Successfully");
  } catch (error) {
    let msg = createCustomeErrorMsg(error);
    console.log(error);
    res.status(400).send(msg);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);
    if (!user) {
      res.status(404).send("User with the given id is not found");
      return;
    }
    res.status(200).send("Successfully");
  } catch (error) {
    let msg = createCustomeErrorMsg(error);
    console.log(error);
    res.status(400).send(msg);
  }
}

function createCustomeErrorMsg(error) {
  if (error instanceof SyntaxError) return "Invalid Json";
  if (error instanceof mongoose.Error.ValidationError)
    return "user validation failed \n" + error.errors.name;
  if (error instanceof mongoose.Error.CastError)
    return "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer";
  if (error instanceof mongoose.Error) return "Error in db";

  return error;
}

module.exports.findUser = findUser;
module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.deleteUser = deleteUser;
