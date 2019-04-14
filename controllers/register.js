//
// My requires
//
const User = require('../models/user');
const createError = require('http-errors');
//
// Register
//
module.exports = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Missing user data!');
        }
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) {
        next(createError(err.message));
    }
};