const allnightDrugstore = require("../models/allnight_drugstore_model");

exports.allnight_drugstore_getall = (req, res, next) => {
    allnightDrugstore
        .find()
        .exec()
        .then(drugstores_list => {
            const count_list = {
                count: drugstores_list.length,
                list_of_drugstores: drugstores_list
            };
            res.status(200).json(count_list);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.allnight_drugstore_getespecific = (req, res, next) => {
    allnightDrugstore
        .findById(req.params.allnightdrugstoreID)
        .exec()
        .then(drugstore => {
            if (drugstore) {
                res.status(200).json({
                    drugstore: drugstore
                });
            } else {
                res.status(404).json({
                    message: "Sorry, we couldn't find any drugstore for this id"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.allnight_drugstore_post = (req, res, next) => {
    const contactsList = [];
    for (contact of req.body.contacts) {
        contactsList.push({
            areacode: contact.areacode,
            number: contact.number
        });
    }
    const newOnDutyDrugStore = new allnightDrugstore({
        userWhoPosted: req.body.userWhoPosted,
        name: req.body.drugstorename,
        contacts: contactsList,
        description: req.body.descriptio,
        address: {
            street: req.body.address.streetName,
            neighborhood: req.body.address.neighborhoodName,
            number: req.body.address.drugstoreNuber,
            gpsCoordinates: {
                latitude: req.body.address.gpsCoordinates.latitude,
                longitude: req.body.address.gpsCoordinates.longitude
            }
        }
    });
    newOnDutyDrugStore
        .save()
        .then(result => {
            res.status(201).json({
                message: "Drugstore reported successfully",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
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
exports.allnight_drugstore_update = (req, res, next) => {
    const id = req.params.allnightdrugstoreID;
    const updateOperations = {};
    for (const operations of req.body) {
        updateOperations[operations.propName] = operations.value;
    }
    allnightDrugstore
        .updateOne({ _id: id }, { $set: updateOperations })
        .exec()
        .then(updateResult => {
            if (updateResult) {
                res.status(200).json({
                    message: "Drugstore updated sucessfuly",
                    result: updateResult
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

exports.allnight_drugstore_delete = (req, res, next) => {
    const id = req.params.allnightdrugstoreID;
    allnightDrugstore
        .deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Post deleted successfuly",
                    result: result
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
