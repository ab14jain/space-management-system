const express = require('express');
const app = express();
const morgam = require('morgan');
const bodyParser = require('body-parser');

const employeeRoutes = require('./api/routes/employess');
const deskRoutes = require('./api/routes/desk');
const locationRoutes = require('./api/routes/location');

app.use(morgam('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    // res.header('Allow-Control-Allow-Origin', "*");    
    // res.header("Allow-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.header('Access-Control-Allow-Origin', "*");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});

app.use('/employees', employeeRoutes);
app.use('/desk', deskRoutes);
app.use('/location', locationRoutes);

//Handle unwanted error, if above routes doesn't match
app.use((req, res, next) => {
    const error = new Error("Not Found Custom");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
});


// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

module.exports = app;