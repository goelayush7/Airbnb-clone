const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js")
const listing = require("../models/listing.js");
const {isLoggedin,isOwner,validatelisting} = require("../models/middleware.js");
const listingcontroller = require("../controller/listing.js")
const multer  = require('multer')//for multipart form
const {storage} = require("../cloudconfig.js");
// const upload = multer({ dest: 'uploads/' }) //destination of everything
const upload=multer({storage});
router.get("/new",isLoggedin,listingcontroller.new1);
router.route("/").get(listingcontroller.index).post(upload.single("listings[image]"),//image ke data ko req.file m le aayega
isLoggedin,wrapAsync(listingcontroller.postnew))
router.route("/:id").get(wrapAsync(listingcontroller.show)).put(isOwner,upload.single("listings[image]"),wrapAsync(listingcontroller.postedit)).delete(isOwner,wrapAsync(listingcontroller.deletelist))
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingcontroller.edit));
router.get("/info/:id",listingcontroller.userinfo);
module.exports = router;