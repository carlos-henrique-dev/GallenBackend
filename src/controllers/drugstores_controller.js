const bcrypt = require("bcrypt");

const Drugstore = require("../models/drugstores_model");

exports.drugstore_signup = (req, res, next) => {};

exports.drugstore_delete = (req, res, next) => {};

exports.drugstore_update = (req, res, next) => {};

// params: [ { "propName": "allNight", "value": true/false } ]
exports.drugstore_setAllNight = (req, res, next) => {
    const id = req.params.drugstoreID;
    const updateOperations = {};

    for (const operations of req.body) {
        updateOperations[operations.propName] = operations.value;
    }

    console.log("update", updateOperations);
    Drugstore.updateOne({ _id: id }, { $set: updateOperations })
        .exec()
        .then(updateResult => {
            if (updateResult) {
                res.status(200).json({
                    message: "status changed"
                });
            } else {
                res.status(404).json({
                    message: "Sorry, we couldn't find any register for this id "
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "deu erro" + err
            });
        });
};
