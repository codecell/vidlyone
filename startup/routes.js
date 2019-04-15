const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const login = require('../routes/login');
const returns = require('../routes/returns');

const error = require('../middleware/error');


module.exports = function (app){
    app.use(express.json());
    app.use('/genres',genres);
    app.use('/customers', customers);
    app.use('/movies', movies);
    app.use('/rentals', rentals);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/returns', returns);
    
    app.use(error);
}