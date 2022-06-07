let express = require("express");
let db = require("../database");
let User=require("../model/user");

const bcrypt = require('bcrypt');
const util  = require('../helper/util');
const router = express.Router();

// User registration API
router.post("/register", async (req, res, next) => {
    let user = new User();
    let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        active: req.body.status || 1,
        user_role: req.body.user_role
    };
    if(!util.validateRequest(req.body, ['email', 'name', 'password', 'user_role'])) {
        util.sendResponse(res, '', {
            message: "Validation Failed. One or more required parameters are missing",
            code: 400,
            status: 400
        });
    }
    else {
        db.query(user.fetchUserDetailsSQL("email", obj.email), async (firstErr, firstData) => {
            if (!firstErr) {
                if (!firstData.length) {
                    bcrypt.hash(obj.password, 10, function (err, hash) {
                        obj.hash = hash;
                        db.query(user.registerUserSQL(obj), async (secondErr, secondData) => {
                            if (!err) {
                                res.status(200).json({
                                    message: 'User Registered successfully!',
                                    status: 200,
                                    emailId: req.body.email
                                    // resourceId: await util.emailSend(obj)
                                });
                            } else {
                                util.sendResponse(res, secondErr, { code: 500, status: 500 });
                            }
                        });
                    });
                } else {
                    util.sendResponse(res, firstData, {
                        message: "User with this email already active!",
                        code: 200,
                        status: 400
                    });
                }
            } else {
                util.sendResponse(res, firstErr, { code: 500, status: 500 });
            }
        });
    }
});


// User Login API

module.exports = router;
