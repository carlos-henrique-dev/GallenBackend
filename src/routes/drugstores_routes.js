const express = require("express");
const router = express.Router();
const authvalidation = require("../middlewares/auth_validation");

const DrugstoreController = require("../controllers/drugstores_controller");

router.delete("/:drugstoreID", authvalidation, DrugstoreController.drugstore_delete);

router.patch("/:drugstoreID", authvalidation, DrugstoreController.drugstore_update);

router.patch(
  "/setAllnight/:drugstoreID",
  authvalidation,
  DrugstoreController.drugstore_setAllNight
);

module.exports = router;
