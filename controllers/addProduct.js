//
// My requires
//
const Product = require('../models/product');
const User = require('../models/user')
const createError = require('http-errors');
//
// addProduct
//
module.exports = async (req, res, next) => {
    try {
        const user = req.user;
        const userID = user._id;
        const prodIDs = user.prodIDs;
        const product = req.body;
        product.username = user.username;
        const productToBeSaved = new Product(product);
        const productSaved = await productToBeSaved.save();
        const productSavedID = productSaved._id
        prodIDs.push(productSavedID);
        await User.findOneAndUpdate({ _id: userID }, { prodIDs }, { new: true });
        res.send( productSaved );
    } catch (err) {
        next(createError(err.message));
    }
}