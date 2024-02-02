const express = require("express");
const router = express.Router({mergeParams : true}); //this is used to connect /:id thing which is being used in the app.js file which is the parent of this..
const wrapAsync = require("../utils/wrapasync.js")
const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");
const {isLoggedin,validateReview,isAuthor} = require("../models/middleware.js")
const listingcontroller = require("../controller/review.js")
router.post("/",isLoggedin,validateReview,wrapAsync(listingcontroller.reviewpost))
 //delete
router.delete("/:reviewId",isAuthor,wrapAsync(listingcontroller.reviewedelete))

module.exports = router