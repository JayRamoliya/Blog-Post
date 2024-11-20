import React, { useState } from 'react';
import './SearchBar.css'; // Importing custom CSS for the search bar
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const searchPosts = async (query) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/search?query=${query}`);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPosts(query);
  };


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
    <>
      <div className="search-bar-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>
      <div className="post-list-container">
        {searchResults.map((post) => (
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
    </>
  );
};

export default SearchBar;
