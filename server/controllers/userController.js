const { default: mongoose } = require("mongoose");
const { userModel, validateUser } = require("../models/user");

//TODO move all validation to Schema
async function findUser(req, res) {
  try {
    //const query = JSON.parse(req.query);
    const query = req.query;

    if (query === undefined || Object.entries(query).length === 0) {
      const users = await userModel.find({});
      res.status(200).send(users);
      return;
    }

    const users = await userModel.find(query);
    if (users.length === 0) {
      res.status(400).send(`
        Unable to find user. it might be because the following reasons:
        1) user with ${query} is not exist in db.
        2) query structure is not proper. should looks like: {name:"" , email:""}
        `);
      return;
    }
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof SyntaxError) res.status(400).send("Invalid Json");
    if (error instanceof mongoose.Error) {
      res.status(400).send("Error in db");
      console.log(error);
    }
  }
}

async function addUser(req, res) {
  try {
    let query = req.body;

    if (query === undefined || Object.entries(query).length === 0) {
      res.status(400).send("query should contain {name: , email: _}");
      return;
    }

    await userModel.insertMany(query);
    console.log("new user is created " + query);
    res.status(200).send("new user is created");
  } catch (error) {
    let msg = "";
    switch (true) {
      case error instanceof SyntaxError:
        msg = "Invalid Json";
        break;
      case error instanceof mongoose.Error.ValidationError:
        msg = "user validation failed \n" + error.errors.name;
        break;
      case error instanceof mongoose.Error:
        msg = "Error in db";
        break;
      default:
        msg = "Error";
    }
    console.log(error);
    res.status(400).send(msg);
  }
}

async function editUser(req, res) {
  //req.body = {id:  , name: <new name> , email: <new email> }

  try {
    const query = req.body;

    if (query === undefined || Object.entries(query).length === 0) {
      res.status(400).send("query should contain {id: , name: , email: _}");
      return;
    }

    const newUser = { ...query };
    delete newUser.id;
    validateUser(newUser);
    const user = await userModel.findOneAndUpdate({ _id: query.id }, newUser);
    if (user) {
      res.status(404).send("User with the given id is not found");
      return;
    }
    res.status(200).send("Successfully");
    //A.findOneAndUpdate(conditions, update: {new object}, options)  // returns Query
  } catch (error) {
    let msg = "";
    switch (true) {
      case error instanceof SyntaxError:
        msg = "Invalid Json";
        break;
      case error instanceof mongoose.Error.ValidationError:
        msg = "user validation failed \n" + error.errors.name;
        break;
      case error instanceof mongoose.Error:
        msg = "Error in db";
        break;
      default:
        msg = "Error";
    }
    console.log(error);
    res.status(400).send(msg);
  }
}

async function deleteUser(req, res) {
  try {
    if (!req.params.id) {
      res.status(400).send("query should contain");
      return;
    }

    const user = await userModel.findByIdAndRemove(req.params.id);
    if (!user) {
      res.status(404).send("User with the given id is not found");
      return;
    }
    res.status(200).send("Successfully");
    //A.findOneAndUpdate(conditions, update: {new object}, options)  // returns Query
  } catch (error) {
    let msg = "";
    switch (true) {
      case error instanceof SyntaxError:
        msg = "Invalid Json";
        break;
      case error instanceof mongoose.Error.ValidationError:
        msg = "user validation failed \n" + error.errors.name;
        break;
      case error instanceof mongoose.Error.CastError:
        msg = error.reason;
        break;
      case error instanceof mongoose.Error:
        msg = "Error in db";
        break;
      default:
        msg = "Error";
    }
    console.log(error);
    res.status(400).send(msg);
  }
}

module.exports.findUser = findUser;
module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.deleteUser = deleteUser;
