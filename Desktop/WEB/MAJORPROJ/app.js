if(process.env.NODE_ENV!="production"){ //this is used to keep a check that whenver the code is being used for production or hosting then the .env file is not required !!
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine", "ejs"); //for setting up the views folder of ejs 
app.set("views", path.join(__dirname, "views")); //for setting up the views folder of ejs 
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const listing = require("./models/listing.js")
const ExpressError = require("./utils/ExpressError.js")
const listings = require("./routes/listing.js")
const reviewss = require("./routes/review.js")
const userrouter = require("./routes/user.js")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport" );
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const sessionoptions = {
    secret : "Mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 24*7*3600*1000
    }
};
app.use(session(sessionoptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());    
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
}) 
app.get("/mountains",async(req,res)=>{
    let listings = await listing.find({ category: "Mountain" },)
    res.render("filter.ejs",{listings})
})
app.use("/listing",listings); //routes
app.use("/listing/:id/review",reviewss);
app.use("/" , userrouter);
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Not Found"));
 })
app.use((err,req,res,next)=>{
    let {status =500,message = "Something wrong"} = err;
    res.render("error.ejs",{message})
})
app.listen(port, () => {
    console.log(`Listening through port ${port}`);
});
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connection done");
    } catch (error) {
        console.error(error);
    }
}
main();
