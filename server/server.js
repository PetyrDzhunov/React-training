const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./constants');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    res.json({ ok: true });
});

app.post('/register', async(req, res, next) => {
    const { email, password } = req.body;

    let error = {};
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            error.message = 'There is already a user with that email!';
            error.code = 500;
            throw error;
        };
    } catch (err) {
        return next(error);
    };

    const createdUser = new User({ email, password });
    try {
        await createdUser.save();
    } catch (err) {
        error.message = 'Failed to create new user!';
        error.code = 500;
        return next(error);
    };


    // create token
    const token = jwt.sign('')

    res.status(201);
    res.json({ userId: createdUser._id, userEmail: createdUser.email });
});

app.use((err, req, res, next) => {
    let status = err.code || 500;
    let message = err.message || 'Something went wrong';

    res.status(err.code).json({ message, status });
});



mongoose.connect('mongodb+srv://PetyrDjunov:secretPassword@cubicles.hdzkr.mongodb.net/auth?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}...`))
    })
    .catch(() => console.log('Database failed to connect'));