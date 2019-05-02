const mongoose = require("mongoose");

const costumerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: { type: String, required: true }
});

module.exports = mongoose.model("costumer", costumerSchema);
