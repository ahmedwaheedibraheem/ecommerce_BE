//
// Requires
//
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
//
// Setting env variables
//
const secretKey = process.env.SECRET_KEY || 'essehemy';
const saltRounds = process.env.SALT_ROUNDS || 5;
const jwtExpiry = process.env.JWT_EXPIRY || '60m';
//
// Promisifying jwt functions
//
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);
//
// Wraping bcrypt.hash()
//
const hash = (password) => bcrypt.hash(password, saltRounds);
//
// Composing userSchema
//
const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        index: {
            unique: true
        }
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        index: {
            unique: true
        },
        validate: validator.isEmail
    },
    prodIDs: {
        type: Array
    }
}, {
        collection: 'users',
        toJSON: {
            hidden: ['password', '__v'],
            transform: true
        }
    });
//
// Hidding 'password' & '__v'
//
userSchema.options.toJSON.transform = function (doc, ret, options) {
    if (Array.isArray(options.hidden)) {
        options.hidden.forEach(element => {
            delete ret[element];
        });
    };
    return ret;
};
//
// Verify password
//
userSchema.method('verifyPassword', async function (enteredPassword) {
    const user = this;
    const flag = await bcrypt.compare(enteredPassword, user.password);
    return flag;
});
//
// Generate user token
//
userSchema.method('generateToken', async function () {
    const user = this;
    const token = await sign({
        _id: user._id,
        expiresIn: jwtExpiry
    }, secretKey);
    return token;
});
//
// getUserByJWT
//
userSchema.static('getUserByJWT', async function (token) {
    const decodedToken = await verify(token, secretKey);
    const user = await User.findById(decodedToken._id);
    if (!user) throw new Error('User not found!');
    return user;
});
//
// Password pre-save hashing
//
userSchema.pre('save', async function () {
    const user = this;
    if (user.isNew) {
        user.password = await hash(user.password);
    }
});
//
// Creating User model
//
const User = mongoose.model('User', userSchema);
//
// Exports
//
module.exports = User;