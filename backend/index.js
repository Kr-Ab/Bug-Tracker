//Imported Modules
const express       = require('express');
const cors          = require('cors');
const mongoose      = require('mongoose');
const bodyParser    = require("body-parser");
const passport      = require("passport");
const fileUpload    = require('express-fileupload');


//Process configuration -> Check .env file
require('dotenv').config();

//Created express app 
const app = express();
const port = process.env.PORT || 5000;

//Using Middleware
app.use(cors())
app.use(express.json())

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Importing Routes
app.use('/users', require('./Routes/route.User'));

//Database Setup
const db_uri = process.env.MONGODB_URI;
mongoose.connect(db_uri, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});

mongoose.connection
    .on('connected', () => {
        console.log(`MongoDB Atlas database connection establised successfully`);
})
    .on('err', (err) => {
        console.log(`Error while connecting to database: ${err}`);
});

//Starting server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});