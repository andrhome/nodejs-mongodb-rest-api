const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postsRoute = require('./routers/posts');

app.use('/posts', postsRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send('We are at home!');
});

// Connect to the MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const dbConnectionCallBack = () => {
    console.log('Connected to the DB!')
};

mongoose.connect(
    process.env.MONGO_URL,
    options,
    dbConnectionCallBack,
)

app.listen(3000);
