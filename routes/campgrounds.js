const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary"); //A multer storage engine for Cloudinary
const upload = multer({ storage });

router.route("/")
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, catchAsync(campgrounds.renderEditForm));


//same routes, diffrent way to implement routes using javascript
// router.get('/', catchAsync(campgrounds.index));
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
// router.get('/:id', catchAsync(campgrounds.showCampground));
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampgroud));
// router.delete('/:id', isLoggedIn, catchAsync(campgrounds.destroyCampground) );

module.exports = router;
