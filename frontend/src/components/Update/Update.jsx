import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Update.css';

import axios from 'axios';


const Update = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [author, setAuthor] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/posts/${postId}`);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setAuthor(post.author);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();  

        const updatedPost = { title, content, author };  
        try {
            const response = await fetch(`http://localhost:5000/posts/${postId}`, {
                method: 'PUT',  
                headers: { 'Content-Type': 'application/json' },  
                body: JSON.stringify(updatedPost),  
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Error updating post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="update-container">
            <h2 className="update-header">Update Post</h2>
            <form className="update-form" onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post Title"
                    className="update-input"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Post Content"
                    className="update-textarea"
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author Name"
                    className="update-input"
                />
                <button type="submit" className="update-button">Update Post</button>
            </form>
        </div>
    );
};

export default Update;
