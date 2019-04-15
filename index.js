const winston = require('winston');

const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/configo')();
require('./startup/validation')();
require('./startup/prod')(app);


app.get('/', (req, res) => {
    res.send('welcome to vidly');
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => { 
    winston.info(`listening on port ${port}`);
}); 

module.exports = server;
