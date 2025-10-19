const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, author: req.user.id });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized to edit this post' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized to delete this post' });

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
};
