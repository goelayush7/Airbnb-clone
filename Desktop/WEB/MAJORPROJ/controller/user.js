const user = require("../models/user");
const passport = require("passport");
const { redsaveurl } = require("../models/middleware");
module.exports.signup =  (req, res) => {
    res.render("user.ejs");
}
module.exports.postsignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password); // user.register is asynchronous
        req.login(registeredUser,(err)=>{ //takes two parameters one the user other the error func to logi auto after signup
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listing");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}
module.exports.login = (req, res) => {
    res.render("login.ejs");
};
module.exports.postlogin = (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    if(res.locals.saveurl){
        res.redirect(res.locals.saveurl); //to redirect to the last using url
    }
    else{
        res.redirect("/listing");
    }  
}
module.exports.logout = async(req,res)=>{
    req.logout((err)=>{
     if((err)=>{ //if the user is succesfully logedout return success else it will return error
       return next(err);
     })
     req.flash("success","you are logged out now");
     res.redirect("/listing");
    })
}
