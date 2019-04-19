const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");

const ProductController = require("../controllers/product_controller");

router.get("/", ProductController.products_get_all);

router.get("/:productId", ProductController.products_get_especific);

router.post("/", authValidation, ProductController.products_post);

router.patch("/:productId", authValidation, ProductController.products_update);

router.delete("/:productId", authValidation, ProductController.products_delete);

module.exports = router;
