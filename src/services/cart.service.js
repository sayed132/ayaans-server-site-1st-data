const Cart = require("../models/cart.module.js");
const CartItem = require("../models/cartItem.module.js");
const Product = require("../models/product.module.js");

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: user });

        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.totalPrice;
            totalDiscountPrice += cartItem.totalDiscountPrice;
            totalItem += cartItem.quantity
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice - totalDiscountPrice;

        return cart;


    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {
    try {
        let cart = await Cart.findOne({ user: userId });

        let product = await Product.findById(req.productId);

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId })

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountPrice: product.discountPrice,
            })
        }

        const createdCartItem = await cartItem.save();
        cart.cartItems.push(createdCartItem);
        await cart.save();
        return ("Item Added To Cart")

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createCart, findUserCart, addCartItem };