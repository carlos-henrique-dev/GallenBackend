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

/* 
{
    "message": "Product posted successfuly",
    "result": {
        "_id": "5cbbaff0e1d93702437eabaf",
        "costumerWhoPosted": "5cbb3eb9dc1fb035ee367d6f",
        "name": "paracetamol",
        "price": 10,
        "__v": 0
    }
}
*/
