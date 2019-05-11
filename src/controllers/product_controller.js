const Product = require("../models/product_model");
const PostPhoto = require("../models/post_photo_model");

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
    console.log("param", req.params);
    Product.find({ _id: req.params.productId })
        .exec()
        .then(user_products => {
            if (user_products) {
                res.status(200).json({
                    count: user_products.length,
                    product: user_products
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

exports.get_user_products = (req, res, next) => {
    Product.findById(req.params.userId)
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json(product);
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

exports.products_post = async (req, res, next) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const postphoto = await PostPhoto.create({ name, size, key, url });

    const product = new Product({
        userWhoPostedId: req.body.userWhoPostedId,
        userWhoPostedType: req.body.userWhoPostedType,
        userWhoPostedName: req.body.userWhoPostedName,
        name: req.body.name,
        price: req.body.price,
        photo: {
            photo_id: postphoto._id,
            photo_url: postphoto.url,
            key: postphoto.key
        },
        whereToBuy: req.body.whereToBuy || "",
        postedAt: req.body.postedAt,
        onSale: req.body.onSale
    });
    product
        .save()
        .then(prod_result => {
            res.status(200).json(prod_result);
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

// TODO: ver como atualizar uma foto
exports.products_update = (req, res, next) => {
    const id = req.params.productId;
    const updateOperations = {};
    for (const operations of req.body) {
        updateOperations[operations.propName] = operations.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOperations })
        .exec()
        .then(updateResult => {
            if (updateResult) {
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
            res.status(500).json({
                error: "deu erro" + error
            });
        });
};

exports.products_delete = async (req, res, next) => {
    Product.findById(req.params.productId)
        .exec()
        .then(async resultado => {
            const photo = await PostPhoto.findById(resultado.photo.photo_id);
            await photo.remove();

            Product.deleteOne({ _id: req.params.productId })
                .exec()
                .then(result => {
                    if (result) {
                        res.status(200).json({
                            message: "Product deleted successfuly"
                        });
                    } else {
                        res.status(404).json({
                            message: "Sorry, we couldn't find any register for this id",
                            result: result
                        });
                    }
                });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};
