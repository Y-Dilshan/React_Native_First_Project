const express = require('express');
const router = express.Router();
const {signup, login, getMe} = require('../controller/authController');
const {protect} = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/me', protect, getMe);

module.exports = router;