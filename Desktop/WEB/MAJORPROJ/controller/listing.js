const { model } = require("mongoose");
const listing = require("../models/listing.js")
const  mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); //location to coordinates
const mapToken = process.env.MAP_TOKEN; 
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req, res) => {
    try {
        const listings = await listing.find();
        res.render("index.ejs", { listings });  
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
module.exports.show = async(req,res)=>{
    let {id} = req.params;
    let reqlisting =await listing.findById(id).populate({path : "reviews",populate:{path:"author"}}).populate("owner")//to show the data of the inhertied class reviews
    if(!reqlisting){
        req.flash("error","The listing you are looking for is either deleted or moved to different path");
        return res.redirect("/listing");
    }
    res.render("show.ejs",{reqlisting})
}

module.exports.new1=(req,res)=>{
    res.render("new.ejs");
}
module.exports.postnew = async (req, res, next) => {
    try {
        let cordinate = await geocodingClient.forwardGeocode({
            query: req.body.listings.location,
            limit: 1 //amount of cordinates we require
          })
            .send()
        const filename = req.file.filename;
        const url = req.file.path;
        const newlist = new listing(req.body.listings);
        newlist.owner = req.user._id;
        newlist.image = {url,filename}
        newlist.category = req.body.Category;
        newlist.geometry = cordinate.body.features[0].geometry;
        let newlisting = await newlist.save();
        console.log(newlisting);
        req.flash("success", "New Listing was created")
        res.redirect("/listing");
    } catch (error) {
        console.error(error);
        req.flash("error", "Error creating the listing");
        res.redirect("/listing");
    }
}
module.exports.edit = async(req,res)=>{
    let {id}  =req.params;
    let listings = await listing.findById(id);
    if(!listings){
        req.flash("error","The listing you are looking for is either deleted or moved to different path");
        return res.redirect("/listing");
    }
    let originalimageurl = listings.image.url;
    originalimageurl = originalimageurl.replace("/upload","/upload/w_250")
    res.render("edit.ejs",{listings,originalimageurl})
};
module.exports.postedit = async(req,res)=>{
    let {id} = req.params;
        // let listing1 = await listing.findById(id);
        let listing1 = await listing.findByIdAndUpdate(id,{...req.body.listings})
        if(typeof req.file!=="undefined"){
            const filename = req.file.filename;
            const url = req.file.path;
            listing1.image={url,filename}; 
        }
        listing1.save();
        req.flash("success","The listing was Updated")
        res.redirect(`/listing/${id}`);
 }
 module.exports.deletelist = async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must me logged in");
    }
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","The listing was deleted")
    res.redirect("/listing");   
 }
 module.exports.userinfo = async(req,res)=>{
    console.log()
    let{id} = req.params; //user id;
    let listings = await listing.find({ owner: id });
    res.render("userinfo.ejs",{listings});
};

