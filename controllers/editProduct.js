//
// My requires
//
const Product = require('../models/product');
const createError = require('http-errors');
//
// editProduct
//
module.exports = async (req, res, next) => {
    try {
        const productID = req.params.productID;
        if (req.body._id) delete req.body._id;
        if (req.body.username) delete req.body.username;
        const user = req.user;
        const prodIDs = user.prodIDs;
        if (prodIDs.indexOf(productID) === -1) {
            throw new Error(createError('Not authorized to delete this product!'));
        }
        const updatedProduct = await Product.findOneAndUpdate({ _id: productID }, req.body, { new: true });
        res.send(updatedProduct);
    } catch (err) {
        next(createError(err.message));
    }
};