const mongoose = require('mongoose');

const connectionString = process.env.DB_URL || 'mongodb://localhost:27017/myecommerce';

mongoose.connect(connectionString, 
    {
    useCreateIndex: true,
    autoIndex: true,
    useNewUrlParser: true
    },
    (error) => {
        if(error){
            process.exit(1);
            console.error('Failed to connect to DB');
        } else {
            console.log('Connected successfully to DB');
        }
    });