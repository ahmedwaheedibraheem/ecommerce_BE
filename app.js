//
// DB require
//
require('./db');
//
// General requires
//
var express = require('express');
var logger = require('morgan');
const cors = require('cors');
//
// My requires
//
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
//
// Express
//
var app = express();
//
// General middlewares
//
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//
// My middlewares
//
app.use('/products', productsRouter);
app.use('/users', usersRouter);
//
// General error handler
//
app.use((err,req,res,next) => {
    console.log(err);
    res.send(err);
}); 
//
// App export
//
module.exports = app;
