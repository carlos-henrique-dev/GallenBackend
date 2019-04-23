const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");

const allnightDrugstoreController = require("../controllers/allnight_drugstore_controller");

// dine
router.get("/", allnightDrugstoreController.allnight_drugstore_getall);

// todo
router.get("/:allnightdrugstoreID", allnightDrugstoreController.allnight_drugstore_getespecific);

// done
router.post("/", authValidation, allnightDrugstoreController.allnight_drugstore_post);

//todo
router.patch(
    "/:allnightdrugstoreID",
    authValidation,
    allnightDrugstoreController.allnight_drugstore_update
);
// todo
router.delete(
    "/:allnightdrugstoreID",
    authValidation,
    allnightDrugstoreController.allnight_drugstore_delete
);

module.exports = router;
