const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    zipCode: {
        type: number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    phone:{
        type: string,
        required: true,
    }
});

const Address = mongoose.model("addresses", AddressSchema);

module.exports = Address;