const express = require('express');
const passport = require('passport');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// Render login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Render register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Handle registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await registerUser(username, password);
  res.redirect('/login');
});

// Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Handle logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
