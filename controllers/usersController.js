const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { validateUpdateUser } = require("../models/user");

/**-----------------------------------
 * @desc Get All Users Profile
 * @router /api/users/profile
 * @method GET
 * @access private (only admin)
 ---------------------------------*/

 module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
     const users = await User.find().select("-password");
     res.status(200).json(users);
 });

 /**-----------------------------------
 * @desc Get  User Profile
 * @router /api/users/profile/:id
 * @method GET
 * @access public
 ---------------------------------*/
 module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if(!user){
        return res.status(404).json({ message:"user not found"});
    }
    res.status(200).json(user );
});
 /**-----------------------------------
 * @desc Update  User Profile
 * @router /api/users/profile/:id
 * @method PUT
 * @access private (only user himself)
 ---------------------------------*/
 module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
   const {error}=validateUpdateUser(req.body);
   if(error) {
    return res.status(400).json({ message: error.details[0].message })
   }
   if (req.body.password){
        const salt =await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);  
    }


    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:{
            username: req.body.username,
            password: req.body.password
        }
    }, {new: true}).select("-password");
    res.status(200).json(updatedUser);
});

/**-----------------------------------
 * @desc Get Users count
 * @router /api/users/count
 * @method GET
 * @access private (only admin)
 ---------------------------------*/

 module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
    const usercount = await User.countDocuments();
    res.status(200).json(usercount);
});

/**-----------------------------------
 * @desc delete User Profile (account )
 * @router /api/users/profile/:id
 * @method DELETE
 * @access private (only admin or user himself)
 ---------------------------------*/
 module.exports.deleteUserProfileCtrl= asyncHandler(async (req, res) => {
    // get the user from db
    const user = await User.findById(req.params.id);
      if(!user){
        return res.status(404).json({message :"user not found"});
      }
    // delete the user himself
    await User.findByIdAndDelete(req.params.id);
    // send a response tp the client
    res.status(200).json({message:"your profile has been deleted"});
  
});
