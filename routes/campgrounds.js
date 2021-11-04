const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampgroud))
    .delete(isLoggedIn, catchAsync(campgrounds.destroyCampground))

router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.renderEditForm))


//two ways to implement routes at javascript

// router.get('/', catchAsync(campgrounds.index));
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
// router.get('/:id', catchAsync(campgrounds.showCampground));
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampgroud));
// router.delete('/:id', isLoggedIn, catchAsync(campgrounds.destroyCampground) );

module.exports = router;