const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { getDefaultErrorMsg } = require('../common/common-utils');

// Get all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        const msg = getDefaultErrorMsg(err);
        res.json(msg);
    }
});

// Get a specific post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        const msg = getDefaultErrorMsg(err);
        res.json(msg);
    }
});

// Send a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        const msg = getDefaultErrorMsg(err);
        res.json(msg);
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.id });
        res.json(removedPost);
    } catch (err) {
        const msg = getDefaultErrorMsg(err);
        res.json(msg);
    }
});

// Update a post
router.patch('/:id', async (req, res) => {
    try {
        const updateData = {};
        for (const prop in req.body) {
            if (!req.body.hasOwnProperty(prop)) continue;
            if (prop === 'date') {
                req.body[prop] = new Date(req.body[prop]);
            }
            updateData[prop] = req.body[prop];
        }

        const updatedPost = await Post.updateOne(
            { _id: req.params.id },
            { $set: updateData }
        );
        res.json(updatedPost);
    } catch (err) {
        const msg = getDefaultErrorMsg(err);
        res.json(msg);
    }
});

module.exports = router;
