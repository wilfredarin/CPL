const express = require("express");
const PORT = 3000
const app = express()


const ejsLayouts = require("express-ejs-layouts")




const path = require('path');
const mongoose = require('mongoose');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));

const URI =  "mongodb+srv://wilfredarin:!_6WH7_6_z$hBec@cluster0.f2nxohr.mongodb.net/cpl?retryWrites=true&w=majority&appName=Cluster0"
require('dotenv').config({ path: '../.env' });
mongoose.connect(process.env.MONGO_URI);

app.use('/', teamRoutes);
app.use("/player",playerRoutes)






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



