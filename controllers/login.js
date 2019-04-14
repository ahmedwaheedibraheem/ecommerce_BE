//
// My requires
//
const User = require('../models/user');
const createError = require('http-errors');
//
// Login
//
module.exports = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Missing user data!');
        }
        const user = await User.findOne({ username });
        if (!user) throw new Error('Login failed!');
        const verified = await user.verifyPassword(password);
        if (!verified) throw new Error('Invalid username or password!');
        const token = await user.generateToken();
        res.send({ token, user });
    } catch (err) {
        next(createError(err.message));
    }
};