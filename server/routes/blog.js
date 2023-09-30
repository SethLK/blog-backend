const express = require("express")
const router = express()
const blog = require('../model/post')
const path = require('path')

router.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/post.html'))
})

router.get('/test', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/list.html'))
})

router.get('/page/:id', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/page.html'))
})

router.post('/post', async (req, res) => {
    const { title, content} = req.body;
    const author = req.session.user._id

    try {
        // Create a new content document and save it to the database
        const newContent = new blog({ title, content, author });
        const savedContent = await newContent.save();
        res.json({ message: 'Content saved successfully', savedContent });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving content');
    }
})

router.get('/data/post', async (req, res) =>{
    const contents = await blog.find()
    res.json(contents)
})

router.get('/data/post/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        const content = await blog.findById(id)
        if(!content){
            res.json({ message: "Content not found"})
        }
        res.status(200).json(content)
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ error: "An error occurred while fetching the content" });
    }

})

module.exports = router
