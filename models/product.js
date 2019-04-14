//
// Requires
//
const mongoose = require('mongoose');
const validator = require('validator');
//
// Product schema
//
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true,
        validate: validator.isURL
    },
    username: {
        type: String,
        required: true
    }
}, {
        collection: 'products',
        toJSON: {
            hidden: ["__v"],
            transform: true
        }
    });
//
// Hidding "__v"
//
productSchema.options.toJSON.transform = function (doc, ret, options) {
    if (Array.isArray(options.hidden)) {
        options.hidden.forEach(element => {
            delete ret[element];
        });
    };
    return ret;
};
//
// Product model
//
const Product = mongoose.model('Product', productSchema);
//
// Exports
//
module.exports = Product;

