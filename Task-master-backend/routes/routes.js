const express = require('express');
const { session } = require('passport');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('../auth/auth');

const router = express.Router();

//login & register endpoints 
router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.error(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message);
        } else {
            req.logIn(user, err => {
                console.log(user);
                const data = {
                    userEmail: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                };
                console.log(data);
                User.findOne({ username: data.username }).then(user => {
                    console.log(user);
                    user.email = data.userEmail;
                })
                    .then(() => {
                        console.log('user created in db');
                        res.status(200).send({ message: 'user created' });
                    });
            });
        }
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, users, info) => {
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            console.error(info.message);
            if (info.message === 'bad username') {
                res.status(401).send(info.message);
            } else {
                res.status(403).send(info.message);
            }
        } else {
            req.logIn(users, () => {
                User.findOne({ username: req.body.username }).then(user => {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: 60 * 60,
                    });
                    // user.token = token;
                    // user.save();
                    res.status(200).send({
                        auth: true,
                        token,
                        message: 'user found & logged in',
                    });
                });
            });
        }
    })(req, res, next);
})

//google login/register
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/task-master',
    passport.authenticate('google', { session: false, failureRedirect: process.env.CLIENT_URL }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60,
        });
        res.status(200).redirect(`${process.env.CLIENT_URL}?token=${token}`);
    }
);

//facebook login/register
router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60,
        });
        res.status(200).redirect(`${process.env.CLIENT_URL}?token=${token}`);
    }
);

//log out
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;