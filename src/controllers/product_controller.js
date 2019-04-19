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

exports.products_get_especific = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    product: product
                });
            } else {
                res.status(404).json({
                    message: "Sorry, we couldn't find any register for this id"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

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

/* 
atualiza o produto, a requisição deve seguir este modelo:
[
	{
		"propName": "nome do campo a ser alterado",
		"value": "valor que deverá substituir o atual"
	}
]
*/
exports.products_update = (req, res, next) => {
    const id = req.params.productId;
    const updateOperations = {};
    console.log("body", req.body);
    for (const operations of req.body) {
        updateOperations[operations.propName] = operations.value;
    }
    Product.update({ _id: id }, { $set: updateOperations })
        .exec()
        .then(updateResult => {
            if (product) {
                res.status(200).json({
                    message: "Product updated sucessfuly"
                });
            } else {
                res.status(404).json({
                    message: "Sorry, we couldn't find any register for this id"
                });
            }
        })
        .catch(error => {
            console.log(err);
            res.status(500).json({
                error: error
            });
        });
};

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Product deleted successfuly"
                });
            } else {
                res.status(404).json({
                    message: "Sorry, we couldn't find any register for this id"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
