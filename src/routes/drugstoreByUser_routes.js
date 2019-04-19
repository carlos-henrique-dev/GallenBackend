const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");

const DrugstoreByUserController = require("../controllers/drugstoreByUser_controller");

router.get("/", DrugstoreByUserController.onduty_drugstore_getall);

// todo
router.get(
    "/:ondutydrugstoreID",
    DrugstoreByUserController.on_duty_drugstore_getespecific
);

router.post(
    "/",
    authValidation,
    DrugstoreByUserController.on_duty_drugstore_post
);

//todo
router.patch(
    "/",
    authValidation,
    DrugstoreByUserController.on_duty_drugstore_update
);

router.delete(
    "/:ondutydrugstoreID",
    authValidation,
    DrugstoreByUserController.on_duty_drugstore_delete
);

module.exports = router;
