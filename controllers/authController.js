// Description: Contains the controller logic for handling
//          user registration and login.

// Import necessary modules
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require('../models/user');

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
    try {
        console.log('Body reçu:', req.body);

        // Validation
        const { error } = validateRegisterUser(req.body);
        if (error) {
            console.log('Erreur de validation:', error.details);
            return res.status(400).json({ 
                message: error.details[0].message,
                details: error.details 
            });
        }

        // Is user already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Cet utilisateur existe déjà" });
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
            role: req.body.role,
            isAdmin: req.body.role === 'admin'
        });

        console.log('Utilisateur à créer:', user);

        // Sauvegarder l'utilisateur
        await user.save();

        // Générer le token
        const token = user.generateAuthToken();

        // send a response to user
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        console.error('Erreur complète:', error);
        res.status(500).json({ 
            message: "Erreur lors de l'inscription",
            error: error.message 
        });
    }
});

/**-----------------------------------
 * @desc Login User
 * @router /api/auth/login
 * @method POST
 * @access public
 ---------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    try {
        console.log('Login - Body reçu:', req.body);

        // Validation
        const { error } = validateLoginUser(req.body);
        if (error) {
            console.log('Login - Erreur de validation:', error.details);
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if user exist
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Check the password
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Générer le token
        const token = user.generateAuthToken();

        // Send a response to the user
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        console.error('Login - Erreur:', error);
        res.status(500).json({ 
            message: "Erreur lors de la connexion",
            error: error.message 
        });
    }
});