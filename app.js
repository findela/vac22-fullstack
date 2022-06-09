let express = require("express");
let bodyparser = require("body-parser");
let cors = require("cors");

let user = require("./controller/user");

const app = express();
const extension = '/api/v1';

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(extension + "/user", user);


app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err,req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});
module.exports = app;
