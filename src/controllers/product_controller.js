const Product = require("../models/product_model");
const Costumer = require("../models/costumer_model");

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
        userWhoPostedId: req.body.userWhoPostedId,
        userWhoPostedType: req.body.userWhoPostedType,
        name: req.body.name,
        price: req.body.price,
        photo: req.body.photoUri || "",
        whereToBuy: req.body.whereToBuy || "",
        postedAt: req.body.postedAt,
        onSale: req.body.onSale
    });
    product
        .save()
        .then(prod_result => {
            console.log(prod_result);
            Costumer.findByIdAndUpdate(
                { _id: prod_result.userWhoPostedId },
                { $push: { productsAcquired: prod_result._id } },
                { new: true }
            )
                //.select("productsAcquired")
                .exec()
                .then(user_update_result => {
                    res.status(200).json({
                        message: "Product added",
                        result: user_update_result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: "erro ao add ao usuario" + err
                    });
                    /*  res.status(201).json({
                message: "Product posted successfuly",
                result: result
            }); */
                });
        })
        .catch(error => {
            res.status(500).json({
                error: "erro ao add o produto" + error
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
