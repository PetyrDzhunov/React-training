const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./constants');

const app = express();







mongoose.connect('mongodb+srv://PetyrDjunov:secretPassword@cubicles.hdzkr.mongodb.net/auth?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on ${PORT}...`))
    })
    .catch(() => console.log('Database failed to connect'));