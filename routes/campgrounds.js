const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');


router.get('/', catchAsync(campgrounds.index));
router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
router.get('/:id', catchAsync(campgrounds.showCampground));
router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.renderEditForm))
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampgroud));
router.delete('/:id', isLoggedIn, catchAsync(campgrounds.destroyCampground));

module.exports = router;