//init code
require('dotenv').config();//must keep on top to use environment variables
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const database = require('./database');
const userController = require('./controllers/user');

//middleware setup
app.use(morgan('dev'));
app.use(cors());
//controller linking with 'url localhost:3000/user/' is default url. so if wanna get user data then localhost:3000/user/get-data
app.use('/user', userController);
//whatever logs you want to generate, you have to tell that mode 
//dev -> means development mode

app.use(cors()); //for cross-origin

//this function (all) will handle all the request coming from http such as get, post etc
app.all(
    '/',
    function(req, res){
        return res.json({
            status: true,
            message: 'Index page working...'
        });
    }
);


//start the server
app.listen(port, function(){
    console.log("Server running on port " + port);
});