const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function () {
    // process.on('uncaughtException', (ex) => {
    //     //new winston.transports.Console({ colorize: true, prettyPrint:true });

    //     winston.error(ex.message, ex);
    //     process.exit(1);    //zero(0), signifies success
    // });
    
    // process.on('unhandledRejection', (ex) => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // })
    
    // winston.add(new winston.transports.File({ filename: 'logfile.log'}));
    // winston.createLogger({
    //     level: "info",
    //     transports: [
    //       new winston.transports.MongoDB({
    //         db: 'mongodb://localhost/vidly',
    //         collection: 'logs',
    //         storeHost: true
    //       })
    //     ],
    //     exitOnError: false
    //   });
   
}