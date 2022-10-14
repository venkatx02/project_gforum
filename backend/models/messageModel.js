const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{
        comment: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', messageSchema);