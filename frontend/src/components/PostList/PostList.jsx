import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleUpdate = async (postId) => {
    navigate(`/update/${postId}`);
  };

  const onDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Post deleted successfully!');
        navigate('/create');
      } else if (response.status === 404) {
        alert('Post not found!');
      } else {
        console.error('Error deleting post:', response.statusText);
        alert('Error deleting post. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the post.');
    }
  };


  return (
    <div className="post-list-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
          <small className="post-author">{post.author}</small>
          <div className="post-actions">
            <button onClick={() => handleUpdate(post.id)} className="update-btn">
              Update
            </button>
            <button onClick={() => onDelete(post.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
