const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({ message: "your api is fully available", status: true })
})

const authRouters = require('./routes/auth_router.js');
app.use('/auth', authRouters);

const userRouters = require('./routes/user.route.js');
app.use('/api/users', userRouters);

const productRouters = require('./routes/product.route.js');
app.use('/api/products', productRouters);

const adminProductRouters = require('./routes/adminProduct.route.js');
app.use('/api/admin/products', adminProductRouters);

const cartRouters = require('./routes/cart.route.js');
app.use('/api/cart', cartRouters);

const cartItemRouters = require('./routes/cartItem.route.js');
app.use('/api/cart_items', cartItemRouters);

const orderRouters = require('./routes/order.router.js');
app.use('/api/orders', orderRouters);

const adminOrderRouters = require('./routes/adminController.router.js');
app.use('/api/admin/orders', adminOrderRouters);

const reviewRouters = require('./routes/review.router.js');
app.use('/api/reviews', reviewRouters);

const ratingRouters = require('./routes/rating.route.js');
app.use('/api/ratings', ratingRouters);

module.exports = app;