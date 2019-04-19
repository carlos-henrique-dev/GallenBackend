const mongoose = require("mongoose");
const Product = require("../models/product_model");

exports.products_get_all = (req, res, next) => {
    Product.find()
        .exec()
        .then(products_list => {
            const response = {
                count: products_list.length,
                products: products_list
            };
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.products_get_especific = (req, res, next) => {};

exports.products_post = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        photo: ""
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: "Product posted successfuly"
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.products_update = (req, res, next) => {
    res.status(200).json({
        message: "você atualizou um produto"
    });
};

exports.products_delete = (req, res, next) => {
    res.status(200).json({
        message: "você excluiu um produto"
    });
};
