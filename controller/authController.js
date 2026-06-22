const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE});
}

// @desc Register user
// @route POST /api/v1/auth/signup

const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        //validate
        if(!name || !email || !password){
            return res.status(400).json({
                success : false,
                message : "Please provide all required fields..."
            })
        }

        // chack if user exists
        const userExists = await User.findOne({email}); // findOne from mongoose
        if(userExists){
            return res.status(400).json({
                success : false,
                message : "User already exists!..."
            })
        }
    }
}