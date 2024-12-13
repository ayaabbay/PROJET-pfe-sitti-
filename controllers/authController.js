// Description: Contains the controller logic for handling
//          user registration and login.

// Import necessary modules
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
    User,
    validateRegisterUser,
    validateLoginUser,
} = require("../models/User"); 

// asyncHandler: a middleware to handle exceptions in async functions
//               without using try-catch blocks
// bcrypt: a library to hash passwords
// User: Mongoose model for the user collection

/**-----------------------------------
 * @desc Register New User - Sign UP
 * @router /api/auth/Register
 * @method POST
 * @access public
 ---------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    // Validation
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
        // pourquoi 400 bad request ( user gave bad informations)
    }

    // Is user already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "user already exist" });
    }

    // Hash the password
    // Salt: a random string that is used to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // New user and save it to db
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
    });
    await user.save();


// @TODO  -sending email (verify account )

    // send a response to user
    res.status(201).json({ message: "you registerd successfully" });
    // 201 created succ
});

/**-----------------------------------
 * @desc Login User
 * @router /api/auth/login
 * @method POST
 * @access public
 ---------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    // Validation
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    // Check the password
    const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    // @TODO  -sending email (verify account if not verified)

    // Generate Auth Token
    const token = user.generateAuthToken();
    
    // Send a response to the user
    res.status(201).json({
        _id: user._id,
        isAdmin: user.isAdmin,
       
        token,
    });
});