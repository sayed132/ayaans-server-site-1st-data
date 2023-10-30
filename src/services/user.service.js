const User = require("../models/user.model");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const { findById } = require("../models/review.module");

const createUser = async (userData) => {
    try {
        let { FirstName, LastName, email } = userData;

        const isUserExist = await User.findOne(email);

        if (isUserExist) {
            throw new Error("User already exists with email", email)
        };

        password = await bcrypt.hash(password, 8)

        const user = await User.create({ FirstName, LastName, email, password })

        console.log("user created successfully", user);

        return user;
    }
    catch (error) {
        throw new Error(error.message)

    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User not found with id", userId);
        }
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne(email);
        if (!user) {
            throw new Error("User not found with email", email);
        }
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
};

const getUserByProfileToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);

        if (!user) {
            throw new Error("User not found with id", userId);
        }
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;

    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = {
    createUser,
    findUserById,
    getUserByEmail,
    getUserByProfileToken,
    getAllUsers
}