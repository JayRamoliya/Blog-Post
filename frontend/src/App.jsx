import axios from 'axios';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList/PostList';
import PostForm from './components/PostForm/PostForm';
import Update from './components/Update/Update';
import { useEffect, useState } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import Navbar from './components/Navbar/Navbar';


function App() {

  const addPost = async (post) => {
    try {
      const response = await axios.post('http://localhost:5000/posts', post);
      if (response.status === 201) {
        alert('Post added successfully!');
      } else {
        alert('Unexpected response from the server. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while adding the post. Please try again.');
    }
  };
  
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/update/:postId" element={<Update />} />
        <Route path="/create" element={<PostForm addPost={addPost}/>}/>
        <Route path="/search" element={<SearchBar/>}/>
      </Routes>
    </Router>
  );
}

export default App;
