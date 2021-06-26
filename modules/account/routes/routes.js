const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const authController = require("../../auth/auth");

//Products Controller
router.post("/create", accountController.create);
router.post("/authenticate", accountController.authenticate);
router.get("/verify_account", authController.userAuthorization,accountController.requestVerification);
router.get("/account_verification", authController.userAuthorization, accountController.verifyAccount);
router.get("/password_reset", authController.userAuthorization, accountController.requestPasswordReset);
router.post("/password_reset", authController.userAuthorization, accountController.resetPassword);
router.get("/:account", authController.userAuthorization,accountController.viewUser);
module.exports = router;

