const listing = require("./listing.js")
const Review = require("./reviews.js");

const ExpressError = require("../utils/ExpressError.js")
const {lisitngSchema} = require("../Schema.js")
const {reviewSchema} = require("../Schema.js")
module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //req stores all the information including the infomration of the url at which it is call at
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must me logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.redsaveurl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.saveurl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id} = req.params; 
    let listing1  = await listing.findById(id);
    if(res.locals.currUser && !listing1.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","Only the host can edit or delete listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateReview= (req,res,next)=>{
    let {error}  = reviewSchema.validate(req.body);  //use to find the error in the post request all the erros include the schema error would be validated here
    if(error){
        let errMSg = error.details.map((el)=>el.message).join(',');
        throw new ExpressError(404, errMSg);
    }
    else{
        next();
    }
}
module.exports.validatelisting = (req, res, next) => {
    const { error } = lisitngSchema.validate(req.body);
    if (error) {
        return next(new ExpressError(404, error));
    }
    next();
}
module.exports.isAuthor=async(req,res,next)=>{
    let {id,reviewId} = req.params; 
    let review  = await Review.findById(reviewId);;
    if(res.locals.currUser && !review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","Only author can delete the review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
