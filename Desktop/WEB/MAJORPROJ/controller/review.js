const Review = require("../models/reviews.js");
const listing = require("../models/listing.js")

module.exports.reviewpost = async(req,res)=>{
    console.log(req.params.id);
    let listing1  = await listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = res.locals.currUser._id;
    listing1.reviews.push(newreview);
    await newreview.save();
    await listing1.save();
    req.flash("success","The review was created")
    res.redirect(`/listing/${listing1._id}`);
 }
 module.exports.reviewedelete =async(req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});//this is used to remove from array remember to pass the array name and the id in the object
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","The review was deleted")
    res.redirect(`/listing/${id}`);
}
