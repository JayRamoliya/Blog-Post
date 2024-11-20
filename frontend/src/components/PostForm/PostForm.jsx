import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PostForm.css'; 

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const navigate = useNavigate(); 

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000) + Date.now();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: generateRandomId(), 
      title,
      content,
      author,
    };
    addPost(newPost);
    setTitle('');
    setContent('');
    setAuthor('');

    navigate('/');
  };

  return (
    <div className="post-form-container">
      <h2 className="form-title">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="textarea-field"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">Add Post</button>
      </form>
    </div>
  );
};

export default PostForm;
