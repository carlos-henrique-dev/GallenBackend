const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");
const multer = require("multer");
const multerConfig = require("../config/multer");

const ProductController = require("../controllers/product_controller");
// done
router.get("/", ProductController.products_get_all);
// done
router.get("/:productId", ProductController.products_get_especific);
// done
router.post(
    "/",
    authValidation,
    multer(multerConfig).single("file"),
    ProductController.products_post
);

// todo
router.patch("/:productId", authValidation, ProductController.products_update);
// todo
router.delete("/:productId", authValidation, ProductController.products_delete);

module.exports = router;
