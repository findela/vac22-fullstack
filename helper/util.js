let env = require('../env');
const mysql = require('mysql');

module.exports = {
    // secretKey: secret,
    // create mysql secure connection instance

    mysqlConnection: mysql.createConnection({
        connectionLimit : env.connectionLimit,
        host: env.host,
        user: env.user,
        database: env.database,
        password: env.password
    }),

    // request validator
    validateRequest(request, validator) {
        let counter = 0;
        validator.forEach((key) => {
            if(request[key]) {
                counter++;
            }
        });
        return counter === validator.length;
    },

    // generic error throw
    sendResponse(res, data, req) {
        res.status(req.code).json({
            message: req.message || "Something went wrong",
            status: req.status,
            data
        });
    }
};
