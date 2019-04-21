const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");

const UserController = require("../controllers/user_controller");

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.delete("/:userID", authValidation, UserController.user_delete);
router.patch("/:userID", authValidation, UserController.user_update);

module.exports = router;
