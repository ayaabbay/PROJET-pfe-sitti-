const mongoose = require('mongoose');
const Joi = require('joi');


const jwt = require("jsonwebtoken");

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({
  username: { 
     type: String,
     required: true, 
     unique: true,
     minlength:2,
     maxlength:100,

     },
  email: { 
     type: String,
     required: true, 
     unique: true,
     minlength:5,
     maxlength:100,
        
    },
 password: { 
    type: String, 
    required: true, 
    minlength:8,
    trim: true,
   },
   isAdmin:{
    type:Boolean,
    default: false,
   },
   isAccountVerified:{
    type:Boolean,
    default: false,
   },
   conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
   messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
},{
    timestamps: true,
});

// generate auth token 
userSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET );

}


// Créer le modèle
const User = mongoose.model('User', userSchema);

// validate register user 
function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().min(2).max(100).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

// validate login user 
function validateLoginUser(obj){
    const schema = Joi.object({

        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


// validate update user 
function validateUpdateUser(obj){
    const schema = Joi.object({
        username: Joi.string().min(2).max(100),
        password: Joi.string().trim().min(8),
    
    });
    return schema.validate(obj);
}
module.exports ={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser 
}
