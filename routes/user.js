const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("./middleware");
const usercontroller = require('../controllers/user.js');

router.route("/signup")
.get( wrapAsync(usercontroller.showsigninpage))
.post( wrapAsync(usercontroller.signin));

router.route("/login")
.get( wrapAsync(usercontroller.showloginpage))
.post(saveRedirectUrl, passport.authenticate
("local", { failureRedirect: '/login',
 failureFlash: true }), usercontroller.login);



router.get("/logout", usercontroller.logout);




module.exports = router;