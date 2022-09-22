const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',  ////you can change the strategy 'local' to something else
        {failureFlash: true, failureRedirect: '/login' }), (users.login))

router.get('/logout', users.logout);

module.exports = router;

//same routes, diffrent way to implement routes using javascript
// router.get('/login', users.renderLogin);
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (users.login));
// router.get('/register', (users.renderRegister));
// router.post('/register', catchAsync(users.register));

