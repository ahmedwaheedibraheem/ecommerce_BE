//
// My requires
//
const Product = require('../models/product');
const createError = require('http-errors');
//
// getUserProducts
//
module.exports = async (req, res, next) => {
    try {
        const user = req.user;
        const userProducts = [];
        const ids = user.prodIDs;
        if (ids.length == 0) {
            return res.send('No products found!');
        }
        for (const id of ids) {
            userProducts.push(Product.findById(id));
        }
        res.send(await Promise.all(userProducts));
    } catch (err) {
        next(createError(err.message));
    }
};