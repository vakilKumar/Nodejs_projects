const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const loginRouters = require('./routes/loginRoutes');
// const signupRouters = require('./components/signup');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/login', loginRouters); 
// app.use('/api', signupRouters); 

module.exports = app;