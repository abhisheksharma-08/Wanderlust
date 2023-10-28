const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {reviewSchema}= require('../models/schema.js');
const Review= require('../models/review.js');
const Listing = require("../models/listing.js");
const {isloggedin,validateReview, isauthor} = require('../routes/middleware.js');
const reviewcontroller = require('../controllers/reviews.js');





  
router.post("/",isloggedin,reviewcontroller.createreview);
  
  
  /// review delete
  router.delete("/:reviewId",isloggedin,isauthor,reviewcontroller.deletereview);

  
  
  module.exports=router;
  