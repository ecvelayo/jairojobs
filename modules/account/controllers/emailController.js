require('dotenv').config({path: __dirname+'/./../../../.env'});
const nodemailer = require("nodemailer");

exports.createMailVerification = async (data) => {
    const url = "http://"+process.env.HOST+":"+process.env.PORT+"/accounts/account_verification?code="+data.code+"&user="+data.u_id;
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth:{
            user: "eanjasonvelayo@gmail.com",
            pass: "r00m12Actual"
        },
        secure: true
    });
    const mailData = {
        from: "eanjasonvelayo@gmail.com",
        to: "ecvelayo@gmail.com",
        subject: "Test Verification",
        html: "<b>Hey There! </b><br><p><a href='"+url+"'>Click on this link to verify</a></p>"
    };
    await transporter.sendMail(mailData, (error, info) => {
        if (error){
            return error;
        }else{
            return true;
        }
    });
}

exports.createPasswordResetRequest = async (data) => {
    const url = "http://"+process.env.HOST+":"+process.env.PORT+"/accounts/reset_request?code="+data.code+"&user="+data.u_id;
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth:{
            user: "eanjasonvelayo@gmail.com",
            pass: "r00m12Actual"
        },
        secure: true
    });
    const mailData = {
        from: "eanjasonvelayo@gmail.com",
        to: "ecvelayo@gmail.com",
        subject: "Password Reset",
        html: "<b>Hey There! </b><br><p><a href='"+url+"'>Click on this link to reset your password.</a></p><br><p>Enter this verification code: "+data.code+"</p>"
    };
    await transporter.sendMail(mailData, (error, info) => {
        if (error){
            return error;
        }else{
            return true;
        }
    });
}