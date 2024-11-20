import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

    const download = async () => {
        try {
            // Make an API call to fetch the Excel file
            const response = await axios.get('http://localhost:5000/export/excel', {
                responseType: 'blob', // Important to handle file download
            });

            // Create a blob URL for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'posts.xlsx'); // Filename for the download
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">All Post</Link></li>
                <li><Link to="/create" className="navbar-link">New Post</Link></li>
                <li><Link to="/search" className="navbar-link">Search Post</Link></li>
                <li className="download" onClick={download}>Dawnload</li>
            </ul>
        </nav>
    );
};

export default Navbar;
