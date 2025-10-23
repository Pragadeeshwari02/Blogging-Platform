import React, { useState, useEffect } from 'react';

function App() {
  // State variables for posts, title and content inputs
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch posts from backend API
  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  // On component mount, fetch posts once
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form submit to add a new post
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        fetchPosts(); // refresh the post list after adding
      } else {
        alert('Failed to add post');
      }
    } catch (err) {
      console.error('Error adding post', err);
    }
  };

  // Handle deleting a post
  const handleDeletePost = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchPosts(); // refresh the post list after deleting
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post', err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Blogging Platform</h1>

      <form onSubmit={handleAddPost} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Add Post
        </button>
      </form>

      <h2>Posts</h2>
      {posts.length === 0 && <p>No posts yet</p>}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 4,
            position: 'relative',
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button
            onClick={() => handleDeletePost(post._id)}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              background: 'red',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
              borderRadius: 3,
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
