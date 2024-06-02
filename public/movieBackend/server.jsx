const express = require('express');
const app = express();
const cors = require('cors');
const blogs = require('./api/movieApi.json');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Movie server is running!");
});

app.get('/movie', (req, res) => {
    res.send(blogs);
});

app.get('/movie/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === id);
    if (blog) {
        res.send(blog);
    } else {
        res.status(404).send({ message: 'movie not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
