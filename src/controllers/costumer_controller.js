const config = require("../config/config");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Costumer = require("../models/costumer_model");

exports.costumer_signup = (req, res, next) => {
    Costumer.findOne({ email: req.body.email })
        .exec()
        .then(costumer => {
            if (costumer) {
                return res.status(409).json({
                    message: "E-mail already registred"
                });
            } else {
                bycrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).json({
                            error: error
                        });
                    } else {
                        const costumer = new Costumer({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        costumer
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User registred successfuly"
                                });
                            })
                            .catch(error => {
                                res.status(500).json({
                                    error: error
                                });
                            });
                    }
                });
            }
        })
        .catch();
};

exports.costumer_login = (req, res, next) => {
    Costumer.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user === null) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            } else {
                bycrypt.compare(
                    req.body.password,
                    user.password,
                    (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: "Auth failed"
                            });
                        }
                        if (result) {
                            const token = jwt.sign(
                                {
                                    email: user.email, // dados para gerar o token
                                    userId: user._id
                                },
                                config.secret // senha jwt
                            );
                            return res.status(200).json({
                                message: "Auth successfull",
                                data: {
                                    id: user._id,
                                    user: user.name,
                                    userProducts: user.productsAcquired,
                                    token: token
                                }
                            });
                        } else {
                            res.status(401).json({
                                message: "Auth failed"
                            });
                        }
                    }
                );
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.costumer_update = (req, res, next) => {};

exports.costumer_delete = (req, res, next) => {
    Costumer.deleteOne({ _id: req.params.userID })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Your account was successfuly deleted"
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.costumer_post_acquired_item = (req, res, next) => {
    const newProduct = {
        product: req.body.productId,
        acquiredAt: {
            acquisitionPlace: req.body.acquisitionPlace,
            acquisitionDate: req.body.acquisitionDate
        }
    };

    Costumer.findByIdAndUpdate(
        { _id: req.params.userID },
        { $push: { productsAcquired: newProduct } },
        { new: true }
    )
        .select("productsAcquired")
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product added",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
