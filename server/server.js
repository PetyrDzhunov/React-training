const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./constants');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/users', (req, res) => {
    res.json({ ok: true });
});

app.post('/login', (req, res) => {
    console.log(req.body);
});




mongoose.connect('mongodb+srv://PetyrDjunov:secretPassword@cubicles.hdzkr.mongodb.net/auth?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`))
    })
    .catch(() => console.log('Database failed to connect'));