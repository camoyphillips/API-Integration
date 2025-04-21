// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

app.use(cors());

app.get('/books', async (req, res) => {
    const search = req.query.q;

    if (!search) {
        return res.status(400).json({ error: 'Missing search query parameter (q)' });
    }

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q: search,
                key: API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data from Google Books API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
