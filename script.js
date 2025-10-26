// ⚠️ Change this to your actual deployed backend URL:
const API_BASE_URL = "https://your-backend.onrender.com/api/posts";

async function loadPosts() {
  try {
    const res = await fetch(API_BASE_URL);
    const posts = await res.json();

    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    if (!posts.length) {
      postsDiv.innerHTML = "<p>No posts yet.</p>";
      return;
    }

    posts.forEach(post => {
      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      `;
      postsDiv.appendChild(div);
    });
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
  }
}

// Handle new post creation
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please fill out both fields!");
    return;
  }

  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    document.getElementById("postForm").reset();
    loadPosts();
  } catch (err) {
    console.error("❌ Error adding post:", err);
    alert("Failed to publish post! Check console for details.");
  }
});

// Load posts on startup
loadPosts();
