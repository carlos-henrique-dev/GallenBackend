const Product = require("../models/product_model");
const Costumer = require("../models/costumer_model");
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
    Product.findById(req.params.productId)
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

exports.products_post = async (req, res, next) => {
    console.log("requisição", req);
    const { originalname: name, size, key, location: url = "" } = req.file;

    const postphoto = await PostPhoto.create({
        name,
        size,
        key,
        url
    });

    // console.log("postphoto", postphoto);

    const product = new Product({
        userWhoPostedId: req.body.userWhoPostedId,
        userWhoPostedType: req.body.userWhoPostedType,
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
            //  console.log("prod result", prod_result);
            Costumer.findByIdAndUpdate(
                { _id: prod_result.userWhoPostedId },
                { $push: { productsAcquired: prod_result._id } },
                { new: true }
            )
                .exec()
                .then(user_update_result => {
                    res.status(200).json({
                        message: "Product added",
                        result: user_update_result
                    });
                })
                .catch(err => {
                    //console.log(err);
                    res.status(500).json({
                        error: "erro ao add ao usuario" + err
                    });
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
    /* const product = await  */ Product.findById(req.params.productId)
        .exec()
        .then(async resultado => {
            // console.log("resultado", resultado);
            const photo = await PostPhoto.findById(resultado.photo.photo_id);
            await photo.remove();

            Product.deleteOne({ _id: req.params.productId })
                .exec()
                .then(result => {
                    //  console.log("result", result);
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
