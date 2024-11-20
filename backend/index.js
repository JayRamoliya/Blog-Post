// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/blogApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    author: String,
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

// Create a new post
app.post('/posts', async (req, res) => {
    const { title, content, author, id } = req.body;
    const newPost = new BlogPost({ title, content, author, id });
    await newPost.save();
    res.status(201).json(newPost);
});

// Read all posts
app.get('/posts', async (req, res) => {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
});


// get one post
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await BlogPost.findOne({ id: parseInt(id) });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
});


// Update a post
app.put('/posts/:postid', async (req, res) => {
    const { postid } = req.params;
    const { title, content, author } = req.body;

    try {
        const updatedPost = await BlogPost.findOneAndUpdate(
            { id: Number(postid) },
            { title, content, author },
            { new: true }
        );

        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
});


// Delete a post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const numericId = Number(id);
        const deletedPost = await BlogPost.findOneAndDelete({ id: numericId });

        if (deletedPost) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
});


// Search posts by title/content
app.get('/search', async (req, res) => {
    const { query } = req.query;
    const posts = await BlogPost.find({
        $or: [{ title: new RegExp(query, 'i') }, { content: new RegExp(query, 'i') }],
    });
    res.status(200).json(posts);
});



// Export posts to Excel
const XLSX = require('xlsx');

app.get('/export/excel', async (req, res) => {
    try {
        const posts = await BlogPost.find(); 

        const formattedPosts = posts.map(post => ({
            Title: post.title,
            Content: post.content,
            Author: post.author,
        }));

        const ws = XLSX.utils.json_to_sheet(formattedPosts);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Posts');

        const file = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename=posts.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(file);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).send('An error occurred while exporting to Excel.');
    }
});



app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
