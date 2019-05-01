const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    userWhoPostedId: { type: mongoose.Schema.Types.ObjectId, ref: "costumers" },
    userWhoPostedType: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photo: {
        photo_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostPhoto" },
        photo_url: { type: String, required: true },
        key: { type: String, required: true }
    },
    whereToBuy: { type: String, default: "" },
    postedAt: { type: Date, default: Date.now },
    onSale: { type: Boolean, default: false }
});

module.exports = mongoose.model("products", productSchema);
