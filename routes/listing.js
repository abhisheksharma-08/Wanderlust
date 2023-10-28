const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../models/schema.js');
const Listing = require("../models/listing.js");
const { isloggedin, isowner, validateListing } = require('../routes/middleware.js');
const listingcontroller = require('../controllers/listing.js');
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage })


router.route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(isloggedin, upload.single('listing[image]'),wrapAsync(listingcontroller.showlisting));
  

router.get("/new", isloggedin, listingcontroller.rendernewform);


router.route("/:id")
  .get(listingcontroller.createlisting)
  .put(isloggedin, isowner,upload.single('listing[image]'), validateListing, listingcontroller.updatelisting)
  .delete(isloggedin, isowner, listingcontroller.deletelisting);

router.get("/:id/edit", isloggedin, isowner, listingcontroller.editlisting);



module.exports = router;