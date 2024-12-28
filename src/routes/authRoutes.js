const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');

require('dotenv').config({ path: '../../.env' });
// console.log(process.env.JWT_SECRET,"s")
// Render Login Page
router.get('/login', async (req, res) => {
    res.render('login',{error:null});
});

// Login Logic
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.render('login', { error: 'Invalid credentials' });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password==user.password;
    if (!isMatch) {
        return res.render('login', { error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;
