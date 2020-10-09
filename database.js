//this file will establish the database connection
//init code
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

//connection code (establishing the connection to database)
mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    
    },
    function(error, link) {
        //check for error
        assert.equal(error, null, 'DB Connect Fail...');
        ///if everything is OK then 
        console.log("DB connected to MongoDb database");
        // console.log(link);//show data available on link var
    }
)