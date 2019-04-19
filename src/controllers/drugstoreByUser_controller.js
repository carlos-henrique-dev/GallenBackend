const DrugstoreByUser = require("../models/drugstoreByUser_model");

exports.onduty_drugstore_getall = (req, res, next) => {
    DrugstoreByUser.find()
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

exports.on_duty_drugstore_getespecific = (req, res, next) => {
    const id = req.params.on_duty_drugstore_id;
};

exports.on_duty_drugstore_post = (req, res, next) => {
    const contactsList = [];
    for (contact of req.body.contacts) {
        contactsList.push({
            areacode: contact.areacode,
            number: contact.number
        });
    }
    const newOnDutyDrugStore = new DrugstoreByUser({
        userWhoPosted: req.body.userWhoPosted,
        name: req.body.drugstorename,
        contacts: contactsList,
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

exports.on_duty_drugstore_update = (req, res, next) => {};

exports.on_duty_drugstore_delete = (req, res, next) => {
    const id = req.params.ondutydrugstoreID;
    DrugstoreByUser.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Post deleted successfuly"
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
