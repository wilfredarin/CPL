const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../.env' });


module.exports = (req, res, next) => {
    const token = req.cookies?.token || req.header('Authorization');
    if (!token) {
        return res.redirect('/auth/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/auth/login');
    }
};
