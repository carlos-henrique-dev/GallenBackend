const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
    areacode: { type: String },
    number: { type: String, required: true }
});

const drugstoreByUserSchema = mongoose.Schema({
    userWhoPostedId: { type: mongoose.Schema.Types.ObjectId, ref: "costumers" },
    userWhoPostedType: { type: String, required: true },
    userWhoPostedName: { type: String, required: true },
    name: { type: String, required: true },
    contacts: [contactsSchema],
    onDutyOn: { type: Date, default: Date.now },
    description: { type: String, default: "" },
    photo: {
        photo_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostPhoto" },
        photo_url: { type: String, required: true },
        key: { type: String, required: true }
    },
    address: {
        street: { type: String, required: true },
        neighborhood: { type: String, default: "" },
        number: { type: String, default: "" },
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
