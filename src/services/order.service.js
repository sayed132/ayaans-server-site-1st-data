const Address = require('../models/address.module');
const Order = require('../models/order.module');
const cartService = require('../services/cart.service');

async function createOrder(user, shippingAddress) {
    let address;
    if (shippingAddress._id) {
        let existsAddress = await Address.findById(shippingAddress._id);
        address = existsAddress;
    }
    else {
        address = new Address(shippingAddress);
        address.user = user;
        await address.save();
        user.address.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = []

    for (const item of cart.cartItems) {
        const orderItem = new orderItems({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountPrice: item.discountPrice
        })
        const createOrderItem = await orderItem.save();
        orderItems.push(createOrderItem);

    }

    const createOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountPrice: cart.totalDiscountPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address
    })

    const saveOrder = await createOrder.save();
    return saveOrder;
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    const orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    return await order.save();
}

async function confirmOrder(orderId) {
    const order = await findOrderById(orderId);

    const orderStatus = "CONFIRMED";
    return await order.save();
}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    const orderStatus = "SHIPPED";
    return await order.save();
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    const orderStatus = "DELIVERED";
    return await order.save();
}

async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);

    const orderStatus = "CANCELED";
    return await order.save();
}

async function findOrderById(orderId) {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

    return order;
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.findOne({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();

        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean();
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = {
    createOrder,
    placeOrder,
    confirmOrder,
    shipOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder

}