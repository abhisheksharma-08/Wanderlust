const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const User = require("../models/user");

module.exports.showsigninpage=async (req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signin=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerdUser = await User.register(newUser, password);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome To WonderLust");
            res.redirect("/listings");
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }


};



module.exports.showloginpage=async (req, res) => {
    res.render("users/login.ejs")
};

module.exports.login= async (req, res) => {
    req.flash("success", "Welcome To WonderLust! You Are Logged In!!");
    let redirecUrl = res.locals.redirectUrl || "/listings";
    console.log(res.locals.redirectUrl);
    res.redirect(redirecUrl);
}

module.exports.logout=async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "Logged Out!!")
        res.redirect("/listings");
    })

};