const mongoose = require("mongoose");

const productID = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }
});

const costumerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: { type: String, required: true },
    productsAcquired: [productID]
});

module.exports = mongoose.model("costumer", costumerSchema);
