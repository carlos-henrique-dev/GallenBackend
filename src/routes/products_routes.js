const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product_controller");

router.get("/", ProductController.products_get_all);

router.get("/:productId", ProductController.products_get_especific);

router.post("/", ProductController.products_post);

router.patch("/:productId", ProductController.products_update);

router.delete("/:productId", ProductController.products_delete);

module.exports = router;
