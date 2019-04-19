const mongoose = require("mongoose");

const productsDetails = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    acquiredAt: {
        acquisitionPlace: { type: String, required: true },
        acquisitionDate: { type: Date, default: Date.now }
    }
});

const costumerSchema = mongoose.Schema({
    userWhoPosted: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    productsAcquired: [productsDetails]
});

module.exports = mongoose.model("costumer", costumerSchema);
