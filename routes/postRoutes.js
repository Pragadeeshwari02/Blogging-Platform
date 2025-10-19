const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
