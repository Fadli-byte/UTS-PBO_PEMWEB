// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/index', (req, res) => { res.render('index'); });

// Rute untuk registrasi
router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.register);

// Rute untuk login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);

// Rute untuk profil
router.get('/profile', authController.profile);

// Rute untuk logout
router.get('/logout', authController.logout);

module.exports = router;
