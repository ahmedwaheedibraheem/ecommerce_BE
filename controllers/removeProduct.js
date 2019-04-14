//
// My requires
//
const Product = require('../models/product');
const User = require('../models/user')
const createError = require('http-errors');
//
// removeProduct
//
module.exports = async (req, res, next) => {
    try {
        const productID = req.params.productID;
        const user = req.user;
        const userID = user._id;
        const prodIDs = user.prodIDs;
        if (prodIDs.indexOf(productID) === -1) {
            throw new Error(createError('Not authorized to delete this product!'));
        }
        const deletedProduct = await Product.findOneAndRemove({ _id: productID });
        const newProdIDs = prodIDs.filter(id => id != productID);
        await User.findOneAndUpdate({ _id: userID }, { prodIDs: newProdIDs }, { new: true });
        res.send( deletedProduct );
    } catch (err) {
        next(createError(err.message));
    }
};