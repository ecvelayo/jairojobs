require('dotenv').config({path: __dirname+'/./../../../.env'});
const jwt = require("jsonwebtoken");
exports.transactionalAuth = (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.user !== undefined){
        next();
    }else{
        res.send("AUTH ERROR");
    }
}

exports.userAuthorization = (req, res, next) => {
    //happens on verification
    console.log(req.cookies);
    if(req.cookies.u_id !== undefined){
        jwt.verify(req.cookies.u_id, process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                throw err;
            }else{
                req.cookies.u_id = decoded;
                next();
            }
        })
    }else if (req.query.user !== undefined){
        next();
    }else{
        res.send("AUTH ERROR");
    }
    
}