const express = require("express");
const router = express.Router();
const authvalidation = require("../middlewares/auth_validation");
const multer = require("multer");
const multerConfig = require("../config/multer");

const DrugstoreController = require("../controllers/drugstores_controller");

router.get("/", DrugstoreController.drugstore_getall);

router.get("/:drugstoreID", authvalidation, DrugstoreController.drugstore_getallnightstatus);

router.patch(
  "/setPhoto",
  authvalidation,
  multer(multerConfig).single("file"),
  DrugstoreController.postdrugstorePhoto
);

router.patch("/:drugstoreID", authvalidation, DrugstoreController.drugstore_update);

router.patch(
  "/setAllnight/:drugstoreID",
  authvalidation,
  DrugstoreController.drugstore_setAllNight
);

module.exports = router;
