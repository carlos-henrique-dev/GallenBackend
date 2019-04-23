const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");

const UserController = require("../controllers/user_controller");

// done
router.post("/signup", UserController.user_signup);
// done
router.post("/login", UserController.user_login);

// todo
router.delete("/:userID", authValidation, UserController.user_delete);
// todo
router.patch("/:userID", authValidation, UserController.user_update);

module.exports = router;
