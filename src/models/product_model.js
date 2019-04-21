const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    userWhoPostedId: { type: mongoose.Schema.Types.ObjectId, ref: "costumers" },
    userWhoPostedType: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photoUri: { type: String, required: false },
    whereToBuy: { type: String, default: "" },
    postedAt: { type: Date, default: Date.now },
    onSale: { type: Boolean, default: false }
});

module.exports = mongoose.model("products", productSchema);
