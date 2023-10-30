const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    size: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    deliveryDate:{
        type: Date,
    },
});

const OrderItem = mongoose.model("orderItems", OrderItemsSchema);

module.exports = OrderItem;