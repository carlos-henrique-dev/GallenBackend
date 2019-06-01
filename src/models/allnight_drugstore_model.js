const mongoose = require("mongoose");

const drugstoreByUserSchema = mongoose.Schema({
  userWhoPostedId: { type: mongoose.Schema.Types.ObjectId, ref: "costumers" },
  userWhoPostedType: { type: String, required: true },
  userWhoPostedName: { type: String, required: true },
  name: { type: String, required: true },
  contact: { areacode: { type: String, default: "" }, number: { type: String, required: true } },
  type: { type: String, default: "temporary" },
  onDutyOn: { type: Date, default: Date.now },
  description: { type: String, default: "" },
  photo: {
    photo_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostPhoto" },
    photo_url: { type: String, default: "" },
    key: { type: String, default: "" }
  },
  address: {
    street: { type: String, required: true },
    neighborhood: { type: String, default: "" },
    number: { type: String, default: "" },
    gpsCoordinates: {
      latitude: { type: String, default: "" },
      longitude: { type: String, default: "" }
    }
  }
});

module.exports = mongoose.model("allnight_drugstore", drugstoreByUserSchema);
