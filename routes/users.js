//
// General requires
//
const express = require('express');
//
// My requires
//
const register = require('../controllers/register');
const login = require('../controllers/login');
const authenticate = require('../controllers/authenticate');
const getUserProducts = require('../controllers/getUserProducts');
const addProduct = require('../controllers/addProduct');
const removeProduct = require('../controllers/removeProduct');
const editProduct = require('../controllers/editProduct');
//
// Express router
//
const router = express.Router();
//
// Registeration
//
router.post('/register', register);
//
// Login
//
router.post('/login', login);
//
// Authenticate
//
router.use(authenticate);
//
// Get profile
//
router.get('/profile', (req, res) => {
    res.send(req.user);
});
//
// Get user products
//
router.get('/products', getUserProducts);
//
// Add product
//
router.post('/products', addProduct);
//
// Remove product
//
router.delete('/products/:productID', removeProduct);
//
// Edit product
//
router.patch('/products/:productID', editProduct);
//
// Exports
//
module.exports = router;