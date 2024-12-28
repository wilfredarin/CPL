const express = require("express");
const PORT = 3000
const app = express()

const cookieParser = require("cookie-parser");
const ejsLayouts = require("express-ejs-layouts")


const path = require('path');
const mongoose = require('mongoose');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));


require('dotenv').config({ path: '../.env' });
mongoose.connect(process.env.MONGO_URI);

app.use('/', teamRoutes);
app.use("/player",playerRoutes)
app.use("/auth",authRoutes)






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



