const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
    areacode: { type: String },
    number: { type: String, required: true }
});

const drugstoreByUserSchema = mongoose.Schema({
    userWhoPosted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "costumers"
    },
    name: { type: String, required: true },
    contacts: [contactsSchema],
    onDutyOn: { type: Date, default: Date.now },
    address: {
        street: { type: String, required: true },
        neighborhood: { type: String },
        number: { type: String, required: true },
        gpsCoordinates: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true }
        }
    }
});

module.exports = mongoose.model("allnigth_drugstore", drugstoreByUserSchema);

/* 
 {
        "temporaryOnDuty": {
            "id": "",
            "name": "",
            "contacts": [{ "areacode": "", "number": "" }],
            "address": {
                "street": "",
                "neighborhood": "",
                "number": "",
                "gpsCoordinates": { "latitude": "", "longitude": "" }
            }
        }
    }
*/
