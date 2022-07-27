const express = require('express');
const router = express.Router();
const { createPost, deletePost, updatePost, getPost, getFeaturedPosts, getPosts } = require('../controllers/postController');
const multer = require('../middleware/multer');
const { parseData } = require('../middleware/parseData');
const { postValidator, validate } = require('../middleware/postValidator');

router.post('/create', multer.single("thumbnail"),
    parseData,
    postValidator,
    validate,
    createPost);
router.put('/:postId', multer.single("thumbnail"),
    parseData,
    postValidator,
    validate,
    updatePost);

router.delete("/:postId", deletePost);  
router.get("/single/:postId", getPost);
router.get("/featured-posts", getFeaturedPosts);
router.get('/posts', getPosts);
module.exports = router;