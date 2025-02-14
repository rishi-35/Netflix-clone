const { login, logout, signUp, authCheck } = require('../controlers/auth.controlers')// Correct path to controllers

const express = require('express');
const protectRoute = require('../middlewares/protectRoute');
const router = express.Router(); // Use express.Router()

// Define routes
router.post('/signup', signUp); // Corrected from '.signup' to '/signup'
router.post('/login', login);
router.post('/logout', logout);
router.get('/authcheck', protectRoute,authCheck);

module.exports = router;
