const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: true}));

// Connect to MongoDB
mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected tcd o MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/api', routes);







