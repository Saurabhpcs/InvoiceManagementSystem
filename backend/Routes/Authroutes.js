const express = require('express');
const passport = require('passport');
const { loginSuccess } = require("../Controllers/Authcontroller");

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/login/success');
  }
);

router.get('/login/success', loginSuccess);


router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
      }
      res.send('Logged out!');
    });
  });
  
module.exports = router;
