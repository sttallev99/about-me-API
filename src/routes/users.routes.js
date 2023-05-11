const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//update user
router.put('/:id', async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json(err);
            }
        }
        try {
            delete req.body.userId;
            await User.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json('Account has been updated')
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json('You can update only your account')
    }
})
//delete user
router.delete('/:id', async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            delete req.body.userId;
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json('Account has been deleted')
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json('You can delete only your account')
    }
})
//get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        return res.status(200).json(user)
    } catch(err) {
        return res.status(500).json(err);
    }
});

//follow a user
router.put('/:id/follow', async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId }});
                await currentUser.updateOne({ $push: { followings: req.body.userId }});
            } else {
                res.status(403).json('you allready follow this user');
            }
        }catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('you cannot follow yourself')
    }
})
//unfollow  user

module.exports = router;