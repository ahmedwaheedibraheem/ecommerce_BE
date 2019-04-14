// 
// Requires
//
const User = require('../models/user');
const createError = require('http-errors');
//
// Authenticate
//
module.exports = async (req, res, next) => {
    try {
        const { authorization: token } = req.headers;
        if (!token) throw new Error("Not authenticated!");
        const user = await User.getUserByJWT(token);
        req.user = user;
        next();
    } catch (err) {
        next(createError(err.message));
    }
};