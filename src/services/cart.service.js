const Cart = require("../models/cart.module");

async function createCart(user){
    try {
        const cart = new Cart({user});
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createCart};