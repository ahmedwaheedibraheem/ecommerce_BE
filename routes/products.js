//
// General requires
//
const express = require('express');
const createError = require('http-errors');
//
// My requires
//
const Product = require('../models/product');
//
// Express router
//
const router = express.Router();
//
// Get all products
//
router.get('/', async (req, res, next) => {
    try {
        const allProducts = await Product.find();
        if(allProducts.length === 0){
            return res.send('No products found!')
        }
        res.send(allProducts);
    } catch (err) {
        next(createError(err.message));
    }
});
//
// Get one product
//
router.get('/:productID', async (req, res, next) => {
    try {
        const productID = req.params.productID;
        const product = await Product.findById(productID);
        res.send(product);
    } catch (err) {
        next(createError(err.message));
    }
});
//
// Exports
//
module.exports = router; 