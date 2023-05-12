const router = require('express').Router();

const Post = require('../models/Post');

//create a post
router.post('/create', async(req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(300).json(savedPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

//update a post
router.put('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId) {
           await post.updateOne(req.body);
           res.status(200).json('post updated')
        } else {
            res.status(403).json('you can update only your posts');
        }
    } catch(err) {

    }

})
//delete a post
//lika a post
//get a post
//get timeline posts

module.exports = router;