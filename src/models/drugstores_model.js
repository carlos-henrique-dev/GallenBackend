const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
  areacode: { type: String },
  number: { type: String, required: true }
});

const drugstoreSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  allNigth: { type: Boolean, default: false },
  contacts: [contactsSchema],
  photo: {
    photo_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostPhoto" },
    photo_url: { type: String, default: "" },
    key: { type: String, default: "" }
  },
  address: {
    street: { type: String, required: true },
    neighborhood: { type: String, required: true },
    number: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    gpsCoordinates: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true }
    }
  },
  manager: { type: String, required: true }
});

module.exports = mongoose.model("drugstore", drugstoreSchema);

/* 

            "openingTimes": [{ "weekDay": "", "am": "", "pm": "" }]
        }
    }
*/
