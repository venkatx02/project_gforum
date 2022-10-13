const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//Register - POST user to api "/api/users"
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill all fields');
    }
//checking whether the user already exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
//hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
//creating a user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

//Login - Authentication - POST user to api "/api/users/login"
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //checking for user
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

// - GET user to api "/api/users/me"
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

//generating token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = { registerUser, loginUser, getMe }