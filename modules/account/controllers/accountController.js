require('dotenv').config({path: __dirname+'/./../../../.env'});
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const model = require('../models/accountModel').model;
const verification = require("../models/accountVerificationModel").model;
const generateCode = require("../../gencode/codegen").generateCodeNotUnique;
const emailService = require("../controllers/emailController");
const passwordReset = require("../models/passwordResetModel").model;
const {Op} = require("sequelize");


exports.create = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        req.body.status = "PENDING";
        req.body.accountType = "USER";
        let ret = await model.create(req.body)
        .then((data)=>{
            //after successfully creating an account, create cookie for the account
            res.clearCookie("u_id");
            const token = jwt.sign({code: data.code}, process.env.JWT_SECRET, {expiresIn: "2 days"});
            res.cookie("u_id", token ,{maxAge: 10000000000, httpOnly: true});
            return {id: data.id};
        }).catch((err)=>{
            return {name: err.name, errors: err.errors[0].message};
        });
        res.send(ret);    
    }catch(err){
        console.log(err.stack);
        res.send(err.stack)
    }

}

//login functionality, creates a cookie upon login
exports.authenticate = async (req, res) => {
    try{
        const data = await model.findOne({
            where:
            {
                username: req.body.username
            }
        }).then(async (data)=>{
            if (data.password !== undefined){
                if (bcrypt.compareSync(req.body.password, data.password)){
                    await model.update({
                        lastLogin: new Date(),
                        loginAttempts: 0
                    },{
                        where: {
                            code:  data.code
                        }
                    })
                    await model.increment(
                        'loginAttempts',{
                            by: 1,
                            where: {
                                code: data.code
                            }
                        }
                    )
                    //clear cookie if it exists to that it gets updated
                    console.log(req.cookies.u_id);
                    if (req.cookies.u_id !== undefined){
                        res.clearCookie("u_id", {path: "/"});
                    }
                    //creates a token for the cookie with the data needed
                    const token = jwt.sign({code: data.code}, process.env.JWT_SECRET, {expiresIn: "2 days"});
                    res.cookie("u_id", token ,{maxAge: 10000000000, httpOnly: true});
                    return true;
                }else if (data.loginAttempts >= 4){
                    //locks the account if unsuccessful attempts made is now 5
                    await model.update({
                        status: "LOCKED"
                    },{
                        where:{
                            code: data.code
                        }
                    })
                    //sets loginAttempts to 5
                    await model.increment(
                        'loginAttempts',{
                            by: 1,
                            where:{
                                code: data.code
                            }
                        }
                    )
                    return false;
                }else{
                    await model.increment(
                        'loginAttempts',{
                            by: 1,
                            where: {
                                code: data.code
                            }
                        }
                    )
                    return false;
                }
            }
        }).catch((err)=>{
            console.log(err);
            return err;
        })
        res.send(data);
    }catch(err){
        console.log(err);
        res.send(err.stack);
    }
}

exports.viewUser = async (req, res) => {
    try{
        const data = await model.findOne({
            where: {
                username: req.params.account
            }
        }).then((data)=>{
            if (data.status == "SUSPENDED"){
                return {status: "Suspended"}
            }else{
                return data;
            }
        }).catch((err)=>{
            return err;
        })
        res.send({username: data.username, status: data.status});
    }catch(err){
        res.send(err.stack);
    }
}

exports.requestVerification = async (req, res) => {
    try{
        //generate 8-digit numeric code
        const code = await generateCode("8", "numeric");
        req.body.code = code;
        req.body.accountUuid = req.cookies.u_id.code;
        const accountData = await model.findOne({
            where: {
                code: req.cookies.u_id.code,
                status: "VERIFIED"
            }
        }).then((data)=>{
            return data;
        }).catch((err)=>{
            return err;
        });
        //accountData is null if there is no account pertaining to the said conditions
        if (accountData === null){
            const data = await verification.create(req.body)
            .then((data)=>{
                if (emailService.createMailVerification({code: data.code, u_id: req.cookies.u_id.code})){
                    return data;
                }
            }).catch((err)=>{
                return err;
            })
            res.send(data);
        }else{
            res.send({error: "true", message: "Account already verified"});
        }
    }catch(err){
        res.send(err);
    }
}

exports.verifyAccount = async (req, res) => {
    try{
        //checks if req.query.code was passed. req.query.code is passed if link sent to email will be opened
        //if not, cookies is checked for verification
        if (req.query.code === "undefined"){
            jwt.verify(req.cookies.u_id, process.env.JWT_SECRET, (err, decoded)=>{
                if (err){
                    throw err;
                }else{
                    req.cookies.u_id = decoded
                }
            });
        }
        const verify = await verification.findOne({
            where:{
                accountUuid: (req.query.code === "undefined") ? req.cookies.u_id.code : req.query.user,
                code: req.query.code,
                
            },
            raw: true
        }).then(async (data)=>{
            const minutes = (new Date().getTime()-new Date(data.createdAt).getTime())/60000; // converts milliseconds to minutes
            //if these values are equal, that means the row hasn't been tampered and used yet.
            if (new Date(data.usedAt).getTime() == new Date(data.createdAt).getTime() && new Date(data.usedAt).getDate() == new Date(data.createdAt).getDate() && minutes <= 5){
                await verification.destroy({
                    where:{
                        accountUuid: (req.query.code === "undefined") ? req.cookies.u_id.code : req.query.user,
                        code: req.query.code
                    },
                }).then(async(updated)=>{
                    await model.update({
                        status: "VERIFIED"
                    },{
                        where: {
                            code: (req.query.code === "undefined") ? req.cookies.u_id.code : req.query.user
                        },
                        returning: true
                    }).then((data)=>{
                        return data;
                    }).catch((err)=>{
                        return err;
                    })
                    return data;
                }).catch((err)=>{
                    return err;
                })
            }else{
                return {verified: false, message: "Code expired"};
            }
        }).catch((err)=>{
            return err;
        })
        res.send(verify);
    }catch(err){
        res.send(err);
    }
}

exports.requestPasswordReset= async (req, res) => {
    try{
        const code = await generateCode("8", "numeric");
        req.body.code = code;
        req.body.accountUuid = req.cookies.u_id.code;
        const codeData = await passwordReset.create(req.body)
        .then((data) => {
            if (emailService.createPasswordResetRequest({code: data.code, u_id: req.cookies.u_id.code})){
                return data;
            }else{
                return {status: false, error: "Please try again."}
            }
        }).catch((err)=>{
            return {status: false, error: err};
        });
        //no errors
        if (codeData.status !== false){
            res.send("Please check your email for the password reset link.");
        }
    }catch(err){
        res.send(err);
    }
}

exports.resetPassword = async (req, res) => {
    try{
        const code = await passwordReset.findOne({
            where: {
                code: req.body.code,
                accountUuid: req.cookies.u_id.code,
            }, 
            raw: true
        }).then(async (data)=>{
            console.log(data);
            if (data !== null){
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(req.body.password, salt);
                console.log("Test");
                await model.update({
                    password: hash
                },{
                    where:{
                        code: req.cookies.u_id.code,
                    },
                    returning: true
                }).then((data)=>{
                    return data;
                }).catch((err)=>{
                    return err;
                });
            }
        }).catch((err)=>{
            return err;
        });
        res.send(code);
    }catch(err){
        res.send(err);
    }
}

exports.viewAccount = async (req, res) => {
    
}