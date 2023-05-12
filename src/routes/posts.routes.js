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
        res.status(500).json(err);
    }

});

//delete a post
router.delete('/:id', async (req, res) => {
    try{
       const post = await Post.findById(req.params.id);
       if(req.body.userId === post.userId) {
        await post.deleteOne();
        res.status(200).json('post deleted');
       }else {
        res.status(403).json('you can delete only your post');
       }
    }catch(err) {
        res.status(500).json(err)
    }
})
//lika a post
router.put('/:id/like', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        console.log(post)
        if(req.body.userId !== post.userId) {
            if(!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId }});
                res.status(200).json('post liked')
            }else{
                res.status(403).json('post was already liked')
            }
        }else {
            res.status(403).json('You cannot like your post')
        }
    } catch(err) {
        res.status(500).json(err)
    }
})
//get a post
//get timeline posts

module.exports = router;