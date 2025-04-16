import React, { useState } from 'react';
import '../styles/Blog.css';

const BlogPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogPosts, setBlogPosts] = useState(
    JSON.parse(localStorage.getItem('blogPosts')) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('❗ Please fill in both the title and content.');
      return;
    }

    const newPost = { title, content, date: new Date().toLocaleString() };
    const updatedPosts = [...blogPosts, newPost];
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setBlogPosts(updatedPosts);
    setTitle('');
    setContent('');
    alert('✅ Blog post added successfully!');
  };

  return (
    <div className="blog-post-container">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Submit Post</button>
      </form>

      <div className="blog-posts-list">
        <h3>Recent Blog Posts</h3>
        {blogPosts.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          blogPosts.map((post, idx) => (
            <div key={idx} className="blog-post-item">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <p><em>{post.date}</em></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogPost;
