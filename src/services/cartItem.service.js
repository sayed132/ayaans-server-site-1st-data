const userService = require('../services/user.service.js');

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);
        if (!item) {
            throw new Error("cartItemId not found" + cartItemId);
        }
        if (!user) {
            throw new Error("user not found" + userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;;
            item.discountPrice = item.quantity * item.product.discountPrice;
            const updateCartItem = await item.save();
            return updateCartItem;
        }
        else {
            throw new Error("you can't update this cart")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
        await CartItem.findByIdAndDelete(cartItemId)
    }
    else {
        throw new Error("you can't remove another user item")
    }
}

async function findCartItemById(cartItemId) {
    const cartItem = await findCartItemById(cartItemId);

    if (cartItem) {
        return cartItem;
    }
    else {
        throw new Error("cart item not found with id " + cartItemId);
    }

}

module.exports = { updateCartItem, removeCartItem, findCartItemById }