const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({ message: "your api is fully available", status: true })
})

const authRouters = require('./routes/auth_router');
app.use('/auth', authRouters);

const userRouters = require('./routes/user.route');
app.use('/api/users', userRouters);

module.exports = app;