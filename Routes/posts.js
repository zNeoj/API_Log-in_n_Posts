const router = require('express').Router();
const { checkAuth } = require('../Middlewares/auth');

const { getPosts, createPost, updatePost, deletePost } = require('../Controllers/postsController');

router.get('/', checkAuth, getPosts);
router.post('/', checkAuth, createPost);
