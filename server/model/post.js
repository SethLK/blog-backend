const mongoose = require('../db/db')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post