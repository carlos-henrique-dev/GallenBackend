const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const Costumer = require("../models/costumer_model");

/* PARAMS: email, password, accessType */
exports.user_signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                res.status(409).json({
                    message: "Email already registred"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).json({
                            error: error
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            accessType: req.body.accessType
                        });
                        user.save()
                            .then(user_result => {
                                if (user_result) {
                                    if (req.body.accessType === "costumer") {
                                        const costumer = new Costumer({
                                            user: user_result._id,
                                            name: req.body.name
                                        });
                                        costumer
                                            .save()
                                            .then(costumer_result => {
                                                res.status(201).json({
                                                    message: "Your account was created successfuly"
                                                });
                                            })
                                            .catch(error => {
                                                res.status(500).json({
                                                    error: error
                                                });
                                            });
                                    } /* else if (req.body.accessType === "drugstoreadmin") {
                                    }  */
                                } else {
                                    res.status(500).json({
                                        message: "Sorry, we couldn\t  complete your registration"
                                    });
                                }
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
/* PARAMS: email, password */
exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user === null) {
                return res.status(401).json({
                    message: "Auth failed - user"
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed - password"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email, // dados para gera o token
                                userId: user._id
                            },
                            config.secret // senha jwt
                        );
                        if (user.accessType === "costumer") {
                            Costumer.findOne({ user: user._id })
                                .exec()
                                .then(costumer => {
                                    res.status(200).json({
                                        message: "Auth successfull",
                                        response: {
                                            userID: costumer.user,
                                            costumerID: costumer._id,
                                            costumerName: costumer.name,
                                            productsAcquired: costumer.productsAcquired,
                                            token: token
                                        }
                                    });
                                })
                                .catch();
                        } /* else if(user.accessType === 'drugstoreadmin'){

                        } */
                    }
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

/* PARAMS: id, new values */
exports.user_update = (req, res, next) => {
    res.status(200).json({
        ok: "ok"
    });
};

/* PARAMS: id */
exports.user_delete = (req, res, next) => {
    res.status(200).json({
        ok: "ok"
    });
};
