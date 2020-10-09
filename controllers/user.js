//Number of models = number of controllers

//init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

// const anotherModel = new User();

//middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//routes goes here
//default route
router.all(
    '/',
    function (req, res) {
        return res.json({
            status: true,
            message: 'User controller working...',
        });
    }
);


//create new user route
router.post(
    '/register',
    [
        //check not empty fields such as name, email, password etc
        //form input name must be same as written inside check('') 
        //escape() converts the special character into html entities like '> to &gt;'
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().trim().normalizeEmail(),
    ],
    function (req, res) {
        //check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //422 is the status code for form validation error but it is optional
            return res.status(422).json(
                {
                    status: false,
                    message: 'Form validation error.',
                    errors: errors.array()
                }
            );
        }
        //has password code on bcrypt
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // return res.json({
        //     status: true,
        //     message: 'User data OK...',
        //     data: req.body,
        //     hashedPassword: hashedPassword,
        // });

        //BY USING CREATE METHOD
        //now inserting user data into MongoDB database
        // User.create(
        //     {
        //         username: req.body.username,
        //         email: req.body.email,
        //         password: hashedPassword,
        //     },
        //     function (error, result) {
        //         //check for error
        //         if (error) {
        //             return res.json({
        //                 status: false,
        //                 message: "New registration failed!",
        //                 error: error,
        //             });

        //             return res.json({
        //                 status: true,
        //                 message: 'Registration success!',
        //                 result: result,
        //             })
        //         }
        //     }
        // );

        //BY USING SAVE METHOD
        //create new user model
        var tempUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        //insert data into database
        tempUser.save(
            function (error, result) {
                //         //check for error
                if (error) {
                    return res.json({
                        status: false,
                        message: "New registration failed!",
                        error: error,
                    });

                    return res.json({
                        status: true,
                        message: 'Registration success!',
                        result: result,
                    })
                }
            }
        );
    }
),

//reading data from database

router.get(
    '/find',
    function(req, res){
        //finding user document
        User.find(
            function (error, result) {
                //         //check for error
                if (error) {
                    return res.json({
                        status: false,
                        message: "Error while finding record!",
                        error: error,
                    });

                    return res.json({
                        status: true,
                        message: 'Record found!',
                        result: result,
                    })
                }
            }
        );
    }
);

    //module exports
    module.exports = router;