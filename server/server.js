const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./constants');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    res.json({ ok: true });
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.status(201);
    res.json({ ok: true });
});


mongoose.connect('mongodb+srv://PetyrDjunov:secretPassword@cubicles.hdzkr.mongodb.net/auth?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`))
    })
    .catch(() => console.log('Database failed to connect'));