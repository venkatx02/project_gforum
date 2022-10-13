const { json } = require('express');
const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

//GET message to api "/api/messages"
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().populate("user", "_id username").populate("comments.postedBy", "_id username");
    res.status(200).json(messages);
})

//POST message to api "/api/messages"
const setMessage = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add text');
    }
    const message = await Message.create({
        text: req.body.text,
        user: req.user
    });
    res.status(200).json(message);
})

//PUT message to api "/api/messages/:id"
const updateMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    if(!message){
        res.status(400);
        throw new Error('No message found');
    }

    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    }
    if(message.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedMessage);
})

//DELETE message to api "/api/messages/:id"
const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    if(!message){
        res.status(400);
        throw new Error('No message found');
    }

    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    }
    if(message.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    await Message.remove();
    res.status(200).json({ id: req.params.id});
})

const like = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id).populate("user", "_id username");
    if(!message){
        res.status(400);
        throw new Error('No message found');
    }
    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    }

    const lmessage = await Message.findByIdAndUpdate(req.params.id, { $push: {likes: req.user._id} }, {new: true}).populate("user", "_id username").populate("comments.postedBy", "_id username");
    res.status(200).json(lmessage);
})

const unlike = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id).populate("user", "_id username");
    if(!message){
        res.status(400);
        throw new Error('No message found');
    }
    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    }

    const ulmessage = await Message.findByIdAndUpdate(req.params.id, { $pull: {likes: req.user._id} }, {new: true}).populate("user", "_id username").populate("comments.postedBy", "_id username");
    res.status(200).json(ulmessage);
})

const comment = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id).populate("user", "_id username");
    if(!message){
        res.status(400);
        throw new Error('No message found');
    }
    if(!req.user){
        res.status(401);
        throw new Error('User not found');
    }

    const comment = {
        comment: req.body.comment,
        postedBy: req.user._id
    }

    const cmessage = await Message.findByIdAndUpdate(req.params.id, { $push: {comments: comment} }, {new: true}).populate("comments.postedBy", "_id username").populate("user", "_id username");
    res.status(200).json(cmessage);
})

module.exports = { getMessages, setMessage, updateMessage, deleteMessage, like, unlike, comment };