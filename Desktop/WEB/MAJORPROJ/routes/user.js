const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapasync");
const passport = require("passport");
const { redsaveurl } = require("../models/middleware");
const listingcontroller = require("../controller/user.js");
const { logout } = require("../controller/review.js");
//signup
router.get("/signup",listingcontroller.signup);
router.post("/signup", wrapAsync(listingcontroller.postsignup));
//logout
router.get("/login",listingcontroller.login);
//redirecting to the same url after login
router.post("/login", redsaveurl,passport.authenticate("local", {
    failureRedirect: "/login", //redirects to login when the username and password doesnt match
    failureFlash: true //prompts a messasge of error
}), listingcontroller.postlogin);
router.get("/logout",wrapAsync(listingcontroller.logout));    
module.exports = router;
