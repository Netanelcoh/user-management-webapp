const { Router } = require("express");
const {
  findUser,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", findUser);
router.post("/add", addUser);
router.post("/edit", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
