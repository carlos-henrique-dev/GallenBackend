const mongoose = require("mongoose");

/* const productsDetails = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    acquiredAt: Date
}); */

const costumerSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    //productsAcquired: [productsDetails]
});

module.exports = mongoose.model("costumer", costumerSchema);
/* 
// usuario
[
    {
        "user": {
            "id": "",
            "username": "",
            "email": "",
            "password": "",
            "productsAcquired": [{ "id": "", "acquiredAt": "" }]
        }
    },

*/
