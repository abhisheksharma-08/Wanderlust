const Listing = require('../models/listing');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema,reviewSchema}= require('../models/schema.js');

module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","You Must be Logged in!!")
        res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

module.exports.isowner=async(req,res,next)=>{
  let { id } = req.params;
  let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are Not the Owner");
     return res.redirect(`/listings/${id}`)
    }
    next();
}




module.exports.isauthor=async(req,res,next)=>{
  let {id, reviewId } = req.params;
  let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are Not the Author");
     return res.redirect(`/listings/${id}`)
    }
    next();
}


module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg)
    }else{
      next();
    }
  };


  module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg)
    }else{
      next();
    }
  };